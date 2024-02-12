import { z } from "zod";
import { smartPhoneValidation } from "./inventoryValidations";

export const sellValidation = z
  .object({
    buyerName: z
      .string()
      .min(2, "Must be at least 2 characters")
      .max(80, "Can't be more than 100 characters")
      .trim(),
    totalQuantity: z.coerce.number().min(1),
    saleDate: z.string(),
    product: smartPhoneValidation,
  })
  .required();
