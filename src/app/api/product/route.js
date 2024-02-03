import { connectDB } from "@/db/connect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    const product = await Product.findOne({ _id: productId })
      .populate({
        path: "userId",
        select: "_id userName image",
      })
      .populate({
        path: "review",
        populate: {
          path: "userId",
        },
      })
      .exec();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.views = product.views + 1;
    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error occurred while fetching product", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}