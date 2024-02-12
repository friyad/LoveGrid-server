import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
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

export interface ISmartPhone {
  name: string;
  price: number;
  quantity: number;
  images: string[];
  releasedDate: Date;
  brand: string; // Sumsung
  model: string; // s20 Ultra
  opSystem: string; // android / ios
  storageCapacityGB: number[]; // 128 GB
  ram: number[]; // 12 / 16 GB
  processor: string; // Octa-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)
  screenSize: number; // 6.78 inches
  color: string;
  cellularTechnology: string; // 3G or 4G
  battery: number; // mAh
  simCard: string; // eSIM  Micro  Nano  Standard
  camera: number[]; // 50 MP, 12 MP
  charger: number; // 65W
  usbType: string; // USB Type-C
  aboutThisPhone: string;
  condition: "New" | "Used";

  rating: number;
  sells: number; // How many times this phone sold
  inStock: boolean;
}

export interface ISell {
  totalQuantity: number;
  buyerName: string;
  saleDate: string;
  product: ISmartPhone;
}
