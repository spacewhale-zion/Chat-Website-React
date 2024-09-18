import mongoose from "mongoose";

const MongoURI = "mongodb://127.0.0.1:27017/mychatapp"; // Explicitly use IPv4

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectToMongoDB;
