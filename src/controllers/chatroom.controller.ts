import { Request, Response } from "express";
import AsyncHandler from "../Utils/asyncHandler";
import chatroom from "../models/chatroom.model";

const createChatRoom = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { user1, user2 } = req.body;

    const existChatRoom = await chatroom.aggregate([
      { $match: { members: [user1, user2] } },
    ]);

    if (existChatRoom) {
      return res.status(200).json({ message: "Chatroom already exist" });
    }
    const chatRoom = await chatroom.create({ user1, user2 });

    if (chatRoom) {
      return res.status(200).json({ message: "Chatroom created successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error creating chatroom",
    });
  }
});
