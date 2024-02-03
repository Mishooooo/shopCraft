import { connectDB } from "@/db/connect";
import Conversation from "@/models/Message";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

connectDB();

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const personId = searchParams.get("personId");

     const session = await getServerSession(authOptions);

     if (!session?.user)
       return NextResponse.json(
         { error: "unautheticated user" },
         { status: 401 }
       );

     const userId = session.user.id;

    
    const message = await Conversation.findOne({
      $or: [
        { members: { $eq: [userId, personId] } },
        { members: { $eq: [personId, userId] } },
      ],
    }).populate({
      path: "members",
    });

    if (!message) {
      const person = await User.findById(personId);

      if (!person) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        messages: [],
        person: { image: person.image, userName: person.userName },
      });
    }
    const person =
      personId === message.members[0]._id.toString()
        ? message.members[0]
        : message.members[1];

    return NextResponse.json({
      messages: message.messages,
      person: { image: person.image, userName: person.userName },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching message" },
      { status: 500 }
    );
  }
}
