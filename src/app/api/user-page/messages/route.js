import { connectDB } from "@/db/connect";
import Conversation from "@/models/Message";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

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

    const userConversations = await Conversation.find({ members: userId })
      .populate({
        path: "members",
        select: "_id userName image",
      })
      .sort({ "messages.createdAt": -1 })
      .exec();

    return NextResponse.json(userConversations);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    
        const session = await getServerSession(authOptions);

    const searchParams = req.nextUrl.searchParams;
    const sender = session.user.id;
    const receiver = searchParams.get("receiver");

     
    const { message } = await req.json();

    // Check if a conversation with the given members already exists
    const existingConversation = await Conversation.findOne({
      $or: [
        { members: { $eq: [sender, receiver] } },
        { members: { $eq: [receiver, sender] } },
      ],
    });

    if (existingConversation) {
      // If it exists, update the existing conversation
      existingConversation.messages.push({ sender, receiver, message });
      const updatedConversation = await existingConversation.save();

      return NextResponse.json(updatedConversation);
    } else {
      // If it doesn't exist, create a new conversation
      const newConversation = new Conversation({
        members: [sender, receiver],
        messages: [{ sender, receiver, message }],
      });

      await newConversation.save();

      return NextResponse.json("message was send succesfully");
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending message" },
      { status: 500 }
    );
  }
}
