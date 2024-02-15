import { connectDB } from "@/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import editAccountSchema from "@/validationSchemas/editAccount";

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

    const user = await User.findById(userId);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const givenUserId = searchParams.get("userId");
    const session = await getServerSession(authOptions);

    if (!session?.user && !givenUserId)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session?.user?.id || givenUserId;
    // Parse the incoming JSON request
    const {
      image,
      new_password,
      confirm_password,
      email_adress,
      user_name,
      phone_number,
    } = await req.json();

    try {
      const validationData = {
        confirm_password: confirm_password !== "" ? confirm_password : undefined,
        new_password,
        email_adress,
        user_name,
        phone_number
      };

      await editAccountSchema.validate(validationData);

    } catch (error) {
      return NextResponse.json({ error: "validation error" }, { status: 400 });
    }

    // Find the user in the database by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (new_password && new_password !== "") {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(new_password, 12);
      user.password = hashedPassword;
    }
    if (phone_number) user.phone = phone_number;
    if (user_name) user.userName = user_name;
    if (email_adress) user.email = email_adress;
    if (image) user.image = image;

    // Save the updated user data to the database
    await user.save();

    // Check if the update was successful
    return NextResponse.json({ message: "User data updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
