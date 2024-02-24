import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { SignUpCredentials, SignInCredentials } from "../types/globalTypes";
import bcrypt from "bcrypt";

export const handleSignUP = async (req: Request, res: Response) => {
  const { email, password, name }: SignUpCredentials = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    // If user already exist then return with message
    if (user?.email) {
      res.status(400).json({
        status: false,
        message: "A user already exist with this email",
      });
      return;
    }

    // If it is an new user
    const hashedPassword = await bcrypt.hash(password, 10); // hash the plain text password
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: ["user"],
    });
    newUser.save();

    res.status(201).json({
      status: true,
      message: "Sign Up Successfull!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profile: "",
      },
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const handleOAuthSignUP = async (req: Request, res: Response) => {
  const { email, password, name, profile }: SignUpCredentials = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    // If user already exist then return with user info
    if (user?.email) {
      res.status(200).json({
        status: true,
        message: "Sign In Successfull!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user?.profile,
        },
      });
      return;
    }

    // If it is an new user
    const hashedPassword = await bcrypt.hash(password, 10); // hash the plain text password
    const newUser = new UserModel({
      name,
      email,
      profile,
      password: hashedPassword,
    });
    newUser.save();

    res.status(201).json({
      status: true,
      message: "Sign Up Successfull!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profile: newUser?.profile,
      },
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const handleSignIn = async (req: Request, res: Response) => {
  const { email, password }: SignInCredentials = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    // If NOT registered user
    if (!user?.email) {
      res.status(400).json({
        status: false,
        message: "Incorrect Email or Password",
      });
      return;
    }

    // Compare user's provided password with db hashed password
    const isPassCorrect = await bcrypt.compare(password, user.password!);
    if (!isPassCorrect) {
      res.status(400).json({
        status: false,
        message: "Incorrect Email or Password",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Sign In Successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};
