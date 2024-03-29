import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const validateRequest =
  (schema: AnySchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.validateSync(req.body);
      next();
    } catch (error: unknown) {
      return res.status(400).json({ status: false, error: error });
    }
  };

export default validateRequest;
