import { connectDB } from "@/db/connect";
import User from "@/models/User";
import Cart from "@/models/Cart";
import Favorites from "@/models/Favorites"; 
import Conversation  from "@/models/Message";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

connectDB();

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;
    
    // Step 1: Find the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 2: Delete user's cart
    await Cart.deleteOne({ userId });

    // Step 3: Delete user's favorites
    await Favorites.deleteOne({ userId });

    // Step 4: Delete conversations associated with the user
    await Conversation.deleteMany({
      members: userId,
    });

    // Step 5: Delete products created by the user
    await Product.deleteMany({ userId });

    // Step 6: Delete reviews associated with the user
    await Review.deleteMany({ userId });

    // Step 7: Delete the user
    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: "User account and associated data deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting user account" },
      { status: 500 }
    );
  }
}
