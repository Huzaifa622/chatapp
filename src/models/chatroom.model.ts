import mongoose, { Document, Model, Models, Schema } from "mongoose";

interface IChatroom extends Document {
  members: Schema.Types.ObjectId[];
  isGroupChat: boolean;
  admin: Schema.Types.ObjectId;
  latestMessage: Schema.Types.ObjectId;
}

const chatroomSchema: Schema<IChatroom> = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isGroupChat: { type: Boolean, default: false },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const chatroom: Model<IChatroom> = mongoose.model("Chatroom", chatroomSchema);
export default chatroom;
