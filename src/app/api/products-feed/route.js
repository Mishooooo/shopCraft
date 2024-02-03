import { connectDB } from "@/db/connect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const dep = searchParams.get("dep");
    const conditionParam = searchParams.get("condition");
    const price = searchParams.get("price");
    const sortId = searchParams.get("sortOption");
    const searchValue = searchParams.get("searchValue");

    const query = {};
    if (dep) {
      const departments = dep.split(".");
      query.departments = { $all: departments };
    }

    if (conditionParam) {
      const condition = conditionParam.split(".");

      query.condition = { $in: condition };
    }

    if (searchValue) {
        // Escape special characters in searchValue
        const escapedSearchValue = searchValue.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

   
      // Text search on both title and description fields
      query.$or = [
        { title: { $regex: new RegExp(searchValue, "i") } },
        { description: { $regex: new RegExp(searchValue, "i") } },
      ];
    }
    const findMaxPrice = await Product.findOne(query).sort({ price: -1 });
    const maxPrice = findMaxPrice?.price;

    if (price) {
      const priceRange = price.split("-");

      query.price = {
        $gte: parseInt(+priceRange[0]),
        $lte: parseInt(+priceRange[1]),
      };
    }

    let sortOption;
    if (sortId === "1" || !sortId) {
      sortOption = { createdAt: -1 }; // Sort by date in descending order
    } else if (sortId === "2") {
      sortOption = { price: 1 }; // Sort by price low to high
    } else if (sortId === "3") {
      sortOption = { price: -1 }; // Sort by price high to low
    }

    // Find products that match any of the specified departments
    const products = await Product.find(query)
      .sort(sortOption)
      .populate({
        path: "userId",
        select: "-_id userName image", // Specify the fields you want to retrieve
      })
      .exec();

    return NextResponse.json({ products, maxPrice });
  } catch (error) {
    console.log('the erorroro in products feed route', error)
      return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
