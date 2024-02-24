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

export interface ICampaign {
  id?: number;
  title: string;
  category: string;
  img: string;
  blurImg: string;
  color: string;
  totalDonations?: number; // donors
  tlDonateAmount?: number; // total donated amount for this campaign
  goal: number;
  fundRaiserName: string;
  fundRaiserPhoto?: string;
  lastDate: string;
  description: string;
}
