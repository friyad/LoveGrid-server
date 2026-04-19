import express, { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
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
campaignRoutes.put(
  "/campaign/:id",
  verifyAdmin,
  validateRequest(CampaignValidationSchema),
  updateCampaign
);
campaignRoutes.delete("/campaign/:id");

export default campaignRoutes;
