import { connectDB } from "@/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import editAccountSchema, {
  phoneSchema,
} from "@/validationSchemas/editAccount";

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
    const editOnlyPhone = searchParams.get("editOnlyPhone");
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { error: "unautheticated user" },
        { status: 401 }
      );

    const userId = session.user.id;
    // Parse the incoming JSON request
    const {
      new_password,
      confirm_password,
      email_adress,
      user_name,
      phone_number,
    } = await req.json();

try {
  if (editOnlyPhone) {
    await phoneSchema.validate({ phone_number });
  } else {
    await editAccountSchema.validate({
      confirm_password: confirm_password !== "" ? confirm_password : undefined,
      new_password: new_password !== "" ? new_password : undefined,
      email_adress,
      user_name,
      phone_number,
    });
  }
} catch (error) {
  console.log(error);
  return NextResponse.json({ error: "validation error" }, { status: 400 });
}

    // Find the user in the database by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    user.phone = phone_number; // phone number is always available

    // Update user data
    if (!editOnlyPhone) {
      user.userName = user_name;
      user.email = email_adress;
      if (new_password) {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(request.password, 12);
        user.password = hashedPassword;
      }
    } 
   

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
