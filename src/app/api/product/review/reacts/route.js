import Review from "@/models/Review";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
       const searchParams = req.nextUrl.searchParams;
       const reviewId = searchParams.get("reviewId");

    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;

  

    const review = await Review.findById(reviewId);
    if (!review.reacts.includes(userId)) {
      review.reacts.push(userId);
    } else {
      review.reacts = review.reacts.filter((id) => id !== userId);
    }
    await review.save();

    return NextResponse.json({ success: "Was successfully liked" });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to add rating" },
      { status: 500 }
    );
  }
}
