import { Request, RequestHandler, Response } from "express";
import AsyncHandler from "../Utils/asyncHandler";
import bcryptjs from "bcryptjs";

import User from "../models/user.model";
import generateToken from "../Utils/generateToken";

export const registerUser = AsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(500).json({
          message: "Please fill all fields",
        });
      }

      const isUserExist = await User.aggregate([{ $match: { email: email } }]);

      if (!isUserExist || isUserExist.length === 0) {
        return res.json({ message: "User already exist" });
      }
      const hashPassword = bcryptjs.genSalt(10, password);
      const user = await User.create({ name, email, hashPassword });

      if (!user) {
        return res.status(500).json({
          message: "some error occur !user",
        });
      }

      return res
        .status(200)
        .json({ message: "user created", token: generateToken(user._id) });
    } catch (error) {
      return res.json({
        message: "catch error user creation",
      });
    }
  }
);

export const loginUser = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.json({
        message: "user not found",
      });
    }

    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
      return res.json({ message: "password not match" });
    }

    return res.status(200).json({
      message: "Login success",
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: "catch error user creation",
    });
  }
});
