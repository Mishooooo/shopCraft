import { connectDB } from "@/db/connect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


connectDB();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const sortId = searchParams.get("sortOption");
    const userId = searchParams.get("userId");




    let sortOption;
    if (sortId === "1" || !sortId) {
      sortOption = { createdAt: -1 }; // Sort by date in descending order
    } else if (sortId === "2") {
      sortOption = { price: 1 }; // Sort by price low to high
    } else if (sortId === "3") {
      sortOption = { price: -1 }; // Sort by price high to low
    }

    // Find products that match any of the specified departments
    const products = await Product.find({ userId })
      .sort(sortOption)
      .populate({
        path: "userId",
        select: "-_id userName image", // Specify the fields you want to retrieve
      })
      .exec();

    if (!products) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
