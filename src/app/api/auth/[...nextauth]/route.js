import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { signIn, signUp } from "@/utils/auth";
import { connectDB } from "@/db/connect";
import User from "@/models/User";
import Conversation from "@/models/Message";
import { defaultMessage } from "@/lib/config";


connectDB();
export const authOptions = {
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/signin",
  },

  providers: [
    CredentialsProvider({
      id: "signup",
      name: "signup",
      credentials: {
        user_name: { label: "user name", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
        confirm_password: { label: "confrim password", type: "password" },
      },

      authorize: signUp,
    }),
    CredentialsProvider({
      id: "signin",
      name: "signin",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      authorize: signIn,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOk_CLIENT_ID,
      clientSecret: process.env.FACEBOOk_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let user;

      // Handle user sign in with providers
      user = await User.findOne({
        providersUserId: { $exists: true },
        password: { $exists: false },
        providersUserId: token.sub,
      });

      // if user is signed with credentials
      if (!user) {
        user = await User.findOne({
          email: session.user.email,
          password: { $exists: true },
        });
      }

      const userSessionData = {
        userName: user.userName,
        image: user.image,
        phone: user.phone,
        id: user._id.toString(),
      };
      session.user = userSessionData;
      return session;
    },
    async signIn({ profile }) {
      if (!profile) return true; // If user is not signed with provider return end the function

      try {
        const providersUserId = profile.id || profile.sub;
        const alreadySignedWithProvider = await User.findOne({
          providersUserId,
        });
        if (alreadySignedWithProvider) return true;

        // adjust for different  providers
        const userName = profile.name || profile.given_name || profile.login;

        const email = profile.email || "";
        const image =
          profile.avatar_url || profile.picture?.data?.url || profile.picture;

        const newUser = new User({
          providersUserId,
          userName: userName.split(" ")[0],
          email,
          image,
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

        return true;
      } catch (error) {
        return NextResponse.json(
          { error: "Register error! Please try again" },
          { status: 500 }
        );
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
