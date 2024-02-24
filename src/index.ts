import express, {
  Request,
  Response,
  Application,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import campaignRoutes from "./routes/campaignRoutes";
// @ts-ignore
import helmet from "helmet";
import connectDB from "./config/dbConfig";

const app: Application = express();

// ENV configuration
dotenv.config();

const whitelist = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];
// CORS handling
app.use(cors({ credentials: true, origin: whitelist }));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(helmet());

// Connect to DB
connectDB();

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", campaignRoutes);

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

/* 
 Campaigns
  /campaigns GET
    - Have to implement a pagination system on the get all campaings route to load 8 campaigns per load
    - we can pass the page number via query params
  /campaign/:id GET
    - It will take an extra value which will define where it will find the campaign on success or on running
  /campaign/:id POST
  /campaign/:id PUT
  /campaign/:id DELETE

 Donate
  /donate/:id POST
   - It will add the donation amount to tlDonateAmount 
   - and increase another donoros on the totalDonations
   - and add this campaign id to user db

  /my-donations
   - It will take user id and find out the myDonations ids from the user modal
   - and then will find the campaings from success and running db and then send them to user
   - If it don't found a campaign that deleted by admin it will not give error. Just skip that campaign
  
 Success Campaigns
  /succeed-campaigns

 Admin
  /make-admin
   - it will take the email and if this user exist with this email then update add the role "admin" on role
   - If this user already an admin then just send an error message

  /statistics
   - it will return two types of stats
   - Stats1: for this stats function will search on the db and find out all categories and how many campaings
             has for each categories [{cagetory:"foo", totalCampaigns: 20}]
   - Stats2: for this stats, how many donations I did and how many donations all user did, these two stats
             with be. {myDonations: 4, totalDonations: 879}

*/
