import mongoose from "mongoose";
const defaultImage = "https://i.im.ge/2023/04/25/Lg2cWX.user-image-default.jpg";

const userSchema = new mongoose.Schema({
  providersUserId: {
    type: String,
  },
  userName: {
    type: String,
    required: "please enter your full name",
  },
  email: {
    type: String,
    // required: "please enter your email address",
    trim: true,
    unique: false,
  },
  password: {
    type: String,
    // required: "please enter a password",
  },
  image: {
    type: String,
    default: defaultImage,
  },
  phone: {
    type: String,
    default: "995",
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  favorites: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  resetNumber: Number,
  resetNumberExpiration: Date,

});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
