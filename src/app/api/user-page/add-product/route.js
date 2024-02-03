import { connectDB } from "@/db/connect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import addProductSchema from "@/validationSchemas/addProduct";

connectDB();

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;

    const req = await request.json();

    try {
      await addProductSchema.validate(req);
    } catch (error) {
      return NextResponse.json({ error: "validation error" }, { status: 400 });
    }

    const { departments, title, price, condition, description, images } = req;

    // Create a new product
    const newProduct = new Product({
      departments,
      views: 0,
      title,
      price,
      condition,
      description,
      images,
      userId,
    });

    await newProduct.save();

    return NextResponse.json({ success: "Product added successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding product" },
      { status: 500 }
    );
  }
}
