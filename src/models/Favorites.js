const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({

  userId: {
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

export default mongoose.models.Favorites || mongoose.model("Favorites", favoritesSchema);
