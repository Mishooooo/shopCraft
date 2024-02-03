import { connectDB } from "@/db/connect";
import Favorites from "@/models/Favorites";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

connectDB();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;

    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    const favorites = await Favorites.findOne({ userId }).populate({
      path: "product",
      populate: {
        path: "userId",
        select: "_id userName image",
      },
    });

    // Check if favorites are found
    if (!favorites) {
      return NextResponse.json([]);
    }

    return NextResponse.json(favorites.product);
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while getting favorites data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    
    const session = await getServerSession(authOptions);;

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;

    // Check if userId and productId are provided
    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing userId or productId parameter" },
        { status: 400 }
      );
    }

    let favorites = await Favorites.findOne({ userId });

    // Check if favorites exist for the user
    if (!favorites) {
      favorites = new Favorites({ userId, product: [productId] });
    } else {
      // Check if product is already in favorites
      if (!favorites.product.includes(productId)) {
        favorites.product.push(productId);
      } else {
        return NextResponse.json(
          { error: "Product already in favorites" },
          { status: 400 }
        );
      }
    }

    await favorites.save();

    return NextResponse.json({ success: "Favorites updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while updating favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    const session = await getServerSession(authOptions);;

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;

    // Check if userId and productId are provided
    if (!productId) {
      return NextResponse.json(
        { error: "productId parameter" },
        { status: 400 }
      );
    }

    const favorites = await Favorites.findOne({ userId });

    // Check if favorites exist for the user
    if (!favorites) {
      return NextResponse.json(
        { error: "Favorites not found" },
        { status: 404 }
      );
    }

    // Remove the product from favorites
    favorites.product = favorites.product.filter(
      (prodId) => prodId.toString() !== productId
    );

    await favorites.save();

    return NextResponse.json({ success: "Product was removed" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while removing product from favorites" },
      { status: 500 }
    );
  }
}
