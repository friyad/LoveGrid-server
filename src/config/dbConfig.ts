import mongoose from "mongoose";

const connectDB = async () => {
  const dbURL: string = process.env.DB_URL || "";

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbURL, {
      dbName: "love-grid",
    });
    console.log("DB connection successfull");
  } catch (error: unknown) {
    console.log("Failed to connet DB", error);
  }
};

export default connectDB;
