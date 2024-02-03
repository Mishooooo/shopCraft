import Product from "@/models/Product";
import Review from "@/models/Review";
import User from "@/models/User";
import  Conversation  from "@/models/Message";

// db/connect.js
const mongoose = require("mongoose");


const options = {
  dbName: "shop-craft", 
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDB() {
  if (mongoose.connection.readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
  mongoose.model("Review", Review.schema);
  mongoose.model("Product", Product.schema);
  mongoose.model("User", User.schema);
  mongoose.model("Conversation", Conversation.schema);


  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  console.log("connect to mongodbbbb")

//Ensure that schemas are registered to not run to bugs, while populate



}
async function disconnectDB() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
}

export { connectDB, disconnectDB };