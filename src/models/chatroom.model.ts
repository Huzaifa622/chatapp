import mongoose, { Document, Model, Models, Schema } from "mongoose";

interface IChatroom extends Document {
  members: Schema.Types.ObjectId[];
}

const chatroomSchema: Schema<IChatroom> = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const chatroomModel: Model<IChatroom> = mongoose.model(
  "Chatroom",
  chatroomSchema
);
export default chatroomModel;
