import mongoose, { Document, Model, Models, Schema } from "mongoose";

interface IChatroom extends Document {
  members: string[];
}

const chatroomSchema: Schema<IChatroom> = new Schema(
  {
    members: [{ type: String, ref: "User" }],
  },
  { timestamps: true }
);

const chatroom: Model<IChatroom> = mongoose.model("Chatroom", chatroomSchema);
export default chatroom;
