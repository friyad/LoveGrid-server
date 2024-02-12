import express, { Router } from "express";
import {
  handleOAuthSignUP,
  handleSignIn,
  handleSignUP,
} from "../controllers/userController";
import validateRequest from "../middlewares/validateRequest";
import {
  LogInValidation,
  OAuthValidation,
  SignUpValidation,
} from "../validations/userValidations";
const userRoutes: Router = express.Router();

userRoutes.post("/signup", validateRequest(SignUpValidation), handleSignUP);
userRoutes.post("/signin", validateRequest(LogInValidation), handleSignIn);
userRoutes.post(
  "/oauth-signup",
  validateRequest(OAuthValidation),
  handleOAuthSignUP
);

export default userRoutes;
