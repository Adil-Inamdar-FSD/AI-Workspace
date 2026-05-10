import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("Mongo URL exists:", !!process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("db connected");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDb;