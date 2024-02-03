import { connectDB } from "@/db/connect";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {  authOptions } from "../../auth/[...nextauth]/route";


connectDB();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const productId = searchParams.get("productId");
    const product = await Product.findById(productId);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch product" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const productId = searchParams.get("productId");

    const session = await getServerSession(authOptions);

    if (!session?.user) return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );
      
    const userId = session.user.id;

    const { rating, comment } = await req.json();
    const product = await Product.findById(productId);
    const newReview = new Review({
      userId,
      rating,
      comment,
    });

    const review = await newReview.save();

    product.review.push(review._id);
    await product.save();
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save review" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
       const session = await getServerSession(authOptions);

       if (!session?.user)
         return NextResponse.json(
           { error: "unautheticated user" },
           { status: 401 }
         );

    const userId = session.user.id;
    const searchParams = req.nextUrl.searchParams;
    const reviewId = searchParams.get("reviewId");

    await Review.findOneAndRemove({_id: reviewId, userId});

    return NextResponse.json({ success: "product was deleted succesfuly" });
  } catch (error) {
    NextResponse.json({ error: "Unable to to delete review" }, { status: 500 });
  }
}
