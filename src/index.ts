import express, {
  Request,
  Response,
  Application,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import cors from "cors";
import cookeParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
// @ts-ignore
import helmet from "helmet";
import connectDB from "./config/dbConfig";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookeParser());
app.use(helmet());

// ENV configuration
dotenv.config();

const whitelist = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];
// CORS handling
app.use(cors({ credentials: true, origin: whitelist }));

// Connect to DB
connectDB();

// Routes
app.use("/api/v1", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Don't try to hack me!");
});

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    error: err,
  });
};

app.use(errorHandler);

const port: number | string = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
