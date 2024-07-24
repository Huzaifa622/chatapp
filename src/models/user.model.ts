import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  pic: string;
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
    pic: {type:String , default:"https://icon-library.com/images/users-icon-png/users-icon-png-15.jpg"}
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model("User", userSchema);
export default User;
