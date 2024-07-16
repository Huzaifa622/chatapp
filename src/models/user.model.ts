import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
