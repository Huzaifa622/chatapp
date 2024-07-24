import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  senderId: Schema.Types.ObjectId;
  content: string;
  chatroomId: Schema.Types.ObjectId;

}

const messageSchema: Schema<IMessage> = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    chatroomId: {
      type: Schema.Types.ObjectId,
      ref: "Chatroom",
    },
  
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
