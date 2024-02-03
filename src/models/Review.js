import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: String,
  reacts: [String] // add users who liked review
  
});

export default mongoose.models.Review ||
  mongoose.model("Review", reviewSchema);
