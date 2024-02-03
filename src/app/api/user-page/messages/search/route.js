import { connectDB } from "@/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchValue = searchParams.get("searchValue");

    if (!searchValue) {
      return NextResponse.json(
        { error: "search parameter is required" },
        { status: 400 }
      );
    }

    const users = await User.find(
      { userName: new RegExp(searchValue, "i") },
      { userName: 1, image: 1, _id: 1 } // 1 indicates to include the field, 0 would exclude it
    );

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
