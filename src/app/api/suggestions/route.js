import { connectDB } from "@/db/connect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const dep = searchParams.get("dep");
    const productId = searchParams.get("productId");
    const suggestionLimit = searchParams.get("suggestionLimit");

    let suggestions;
    const departments = dep?.split(".");

    const findParameter = dep
      ? {
          departments: { $all: departments }
        }
      : {};

    suggestions = await Product.find(findParameter)
      .sort({ createdAt: -1 })
      .limit(suggestionLimit ? +suggestionLimit : 15);

    if (suggestions && productId)
      suggestions = suggestions.filter(
        (suggestion) => suggestion._id.toString() !== productId
      );

    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}
