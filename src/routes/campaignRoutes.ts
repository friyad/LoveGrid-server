import express, { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
} from "../controllers/campaignController";
import { CampaignValidationSchema } from "../validations/campaignValidations";
import verifyAdmin from "../middlewares/verifyAdmin";

const campaignRoutes: Router = express.Router();

campaignRoutes.get("/campaigns", getAllCampaigns);
campaignRoutes.get("/campaign/:id", getCampaignById);
campaignRoutes.post(
  "/campaign",
  verifyAdmin,
  validateRequest(CampaignValidationSchema),
  createCampaign
);
campaignRoutes.put("/campaign/:id");
campaignRoutes.delete("/campaign/:id");

export default campaignRoutes;
