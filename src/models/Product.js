import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    departments: { type: [String], required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    views: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists, and if not, define it
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
