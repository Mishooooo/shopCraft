import User from "@/models/User";
import { signInSchema, signUpSchema } from "@/validationSchemas/auth";
import bcrypt from "bcryptjs";
import Conversation from "@/models/Message";
import {  defaultMessage } from "@/lib/config";


export const signUp = async (credentials, res) => {
  const { user_name, email, password, confirm_password } = credentials;
  try {
    await signUpSchema.validate({
      user_name,
      email,
      password,
      confirm_password,
    });
  } catch (error) {
    throw new Error(error);
  }

  const user = await User.findOne({
    email,
    password: { $exists: true }, // fetch only data which includes password, in order to make sure it is uploaded with credentials
  });
  if (user) {
    throw new Error("this email already exits.");
  }

  const cryptedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    userName: user_name,
    email,
    password: cryptedPassword,
  });
  await newUser.save();

  // Send user default message by the admin
  const message = defaultMessage(newUser.userName);

  const newConversation = new Conversation({
    members: [process.env.MONGODB_ADMINS_ID, newUser._id],
    messages: [
      {
        sender: process.env.MONGODB_ADMINS_ID,
        receiver: newUser._id,
        message,
      },
    ],
  });

  await newConversation.save();

  const session = credentials;

  return session;
};

export const signIn = async (credentials, res) => {
  const { email, password } = credentials;

  try {
    await signInSchema.validate({ email, password });
  } catch (error) {
    throw new Error(error);
  }

  const user = await User.findOne({
    email,
    password: { $exists: true }, // fetch only data which includes password, in order to make sure it is uploaded with credentials
  });

  if (!user) {
    // Throw error to indicate authentication failure

    throw new Error("Email could not be found");
  }

  // Implement your password comparison logic
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Password is incorrect");
  }

  // If authentication is successful, return the user object
  return user;
};
