import { connectDB } from "@/db/connect";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

connectDB();

export async function GET(request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;


    const cartItems = await Cart.findOne({ userId }).populate({
      path: "product",
      select: "_id title images price",
      populate: {
        path: "userId",
        select: "_id userName phone",
      },
    });

    if (!cartItems) {
      return NextResponse.json([]);
    }

    const cart = cartItems.product.map((item) => {
      const plainItem = item.toObject();
      plainItem.imageUrl = plainItem.images[0];
      delete plainItem.images;

      return plainItem;
    });

    return NextResponse.json(cart);
  } catch (error) {
        console.log(error);

    return NextResponse.json(
      { success: false, error: "Error occurred while getting cart data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, text: "User not found" },
        { status: 404 }
      );
    }

    if (user.cart) {
      const cart = await Cart.findOne({ userId });

      if (!cart.product.includes(productId)) {
        cart.product.push(productId);
        await cart.save();
        return NextResponse.json({ success: true, text: "Cart was updated" });
      } else {
        return NextResponse.json({
          success: false,
          text: "Product was already added in cart",
        });
      }
    }

    const cartItem = new Cart({
      userId,
      product: [productId],
    });

    await cartItem.save();
    user.cart = cartItem._id;
    await user.save();

    return NextResponse.json({
      success: "Product was added successfully to the cart",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding product to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ error: "unautheticated user" }, { status: 401 });

  const userId = session.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (productId) {
      cart.product = cart.product.filter(
        (prodId) => prodId.toString() !== productId
      );
    } else {
      const { arrOfProductIds } = await request.json();
      cart.product = cart.product.filter(
        (prodId) => !arrOfProductIds.includes(prodId.toString())
      );
    }

    await cart.save();

    return NextResponse.json({ success: "Product was removed" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error removing product from cart" },
      { status: 500 }
    );
  }
}
