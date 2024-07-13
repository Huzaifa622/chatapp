import mongoose from "mongoose";

export const DBConnection = async () => {
  await mongoose.connect("mongodb://localhost:27017/chat");
};
