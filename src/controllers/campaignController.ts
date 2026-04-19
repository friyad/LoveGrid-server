import { Request, Response } from "express";
import { CampaignModel, CampSuccessModel } from "../models/campaignModel";

// GET all campaigns with pagination
export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 8;
    const startIndex = (page - 1) * limit;

    const campaigns = await CampaignModel.find().limit(limit).skip(startIndex);

    // const cursor = productCollection.find({}, { limit: 10, skip: pageNum * 10 });
    // const product = await cursor.toArray();

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET a single campaign by ID
export const getCampaignById = async (req: Request, res: Response) => {
  const campaignType = req.query.type;

  try {
    const campaign =
      campaignType === "success"
        ? await CampSuccessModel.findById(req.params.id)
        : await CampaignModel.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE a new campaign
export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newCampaign = await CampaignModel.create(body);
    res.status(201).json({ status: true, data: newCampaign });
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal server error" });
  }
};

// UPDATE a campaign
export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newCampaign = await CampaignModel.create(body);
    res.status(201).json({ status: true, data: newCampaign });
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal server error" });
  }
};
