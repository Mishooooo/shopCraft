const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

 userId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

export default mongoose.models.Cart ||
  mongoose.model("Cart", cartSchema);
