import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(
  process.env,
  "***************************************************process.env***************************************************"
);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

async function connect() {
  if (mongoose.connection.readyState !== 1 && MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
    }
  } else {
    console.log("Already connected to MongoDB");
  }
}

export default connect;
