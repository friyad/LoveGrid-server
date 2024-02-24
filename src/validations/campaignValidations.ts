import * as Yup from "yup";

export const CampaignValidationSchema = Yup.object().shape({
  title: Yup.string().required(),
  category: Yup.string().required(),
  img: Yup.string().required(),
  blurImg: Yup.string().required(),
  color: Yup.string().required(),
  totalDonations: Yup.number(),
  tlDonateAmount: Yup.number(),
  goal: Yup.number().required(),
  fundRaiserName: Yup.string().required(),
  fundRaiserPhoto: Yup.string(),
  lastDate: Yup.string().required(),
  description: Yup.string().required(),
});
