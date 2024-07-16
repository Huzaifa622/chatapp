import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  senderId: Schema.Types.ObjectId;
  content: string;
  chatroomId: Schema.Types.ObjectId;
  date: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  chatroomId: {
    type: Schema.Types.ObjectId,
    ref: "Chatroom",
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
