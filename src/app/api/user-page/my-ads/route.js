import { connectDB } from "@/db/connect";
import Product from "@/models/Product";
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


    // Find products that match any of the specified departments
    const products = await Product.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "-_id userName image", // Specify the fields you want to retrieve
      })
      .exec();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("productId");

     const session = await getServerSession(authOptions);;

     if (!session?.user)
       return NextResponse.json(
         { error: "unautheticated user" },
         { status: 401 }
       );

     const userId = session.user.id;

    // Find products that match any of the specified departments
    const product = await Product.findOneAndRemove({ _id: productId, userId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: "removed successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}