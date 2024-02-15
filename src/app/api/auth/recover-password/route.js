import { connectDB } from "@/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

connectDB();

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: MAILING_SERVICE_REFRESH_TOKEN });

const transporter = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken,
      },
      host: "smtp.gmail.com",
      port: 587,
    });
  } catch (error) {
    console.log(error);
  }
};

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({
      email,
      password: { $exists: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email could not be found" },
        { status: 404 }
      );
    }

    const currentTime = Date.now();
    const lastResetEmailTime = user.resetNumberExpiration || 0; // Default to 0 if not set

    // Check if the time elapsed since the last email is less than 10 seconds
     if (lastResetEmailTime - currentTime > 170000) {
       return NextResponse.json(
         {
           error: "Please wait 10 seconds before sending another email.",
         },
         { status: 429 }
       );
     }

    // Generate a 6-digit random number
    const sixDigitRandomNumber = Math.floor(100000 + Math.random() * 900000);

    user.resetNumber = sixDigitRandomNumber;
    user.resetNumberExpiration = currentTime + 180000; // current time + 3 minutes
    await user.save();

    const emailText = `<p>Hello,</p>
      <p>We received a request to reset your password for ShopCraft account.</p>
      <p>Your verification code is: <strong>${sixDigitRandomNumber}</strong></p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>This code will expire in one 3 minutes for security reasons.</p>
      <p>Thank you!</p>`;

    const mailOptions = {
      to: email,
      from: `shopCraft" <${SENDER_EMAIL_ADDRESS}>`,
      subject: "Password Reset Request",
      html: emailText,
    };

    const transport = await transporter();
   transport.sendMail(mailOptions);

    return NextResponse.json({ success: "The email was sent" });
  } catch (error) {
    return NextResponse.json({
      error: "Error occured while sending email, try again!"},
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const verificationValue = searchParams.get("verification-value");
    const email = searchParams.get("email");

    const user = await User.findOne({
      email,
      password: { $exists: true }, // fetch only data which includes password, in order to make sure it is uploaded with credentials
      resetNumber: verificationValue,
      resetNumberExpiration: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json({
        error: "Invalid verification value, try again!",
      });

    return NextResponse.json({
      email: user.email,
      userId: user._id,
      verificationValue,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
