import { Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";
import { CRequest } from "../types/globalTypes";
import { getToken } from "next-auth/jwt";

const verifyAdmin = async (
  req: CRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // We don't need to provide any sceret here because of I already put an NEXTAUTH_SECRET
    // inside of .env and this getToken function will autometically take this env anv verify
    // the token then provide us a token
    const token: any = await getToken({ req });

    if (!token) {
      res.status(401).json({
        status: false,
        message: "Unauthorized, invalid token",
      });
      return;
    }

    const user = await UserModel.findById(token.id);

    if (!user) {
      res
        .status(401)
        .clearCookie("next-auth.session-token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
        .json({
          status: false,
          message: "Unauthorized",
        });
      return;
    }

    if (!user?.role?.includes("admin")) {
      res.status(400).json({
        status: false,
        message: "Don't have enough permission for this action",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    console.log((error as Error).message);
    res
      .status(401)
      .clearCookie("next-auth.session-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        status: false,
        message: "Unauthorized",
      });
  }
};

export default verifyAdmin;
