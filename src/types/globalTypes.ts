import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
  id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string[];
  profile?: string | null | undefined;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  profile?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface CRequest extends Request {
  user?: IUser;
}
