import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import websiteRouter from "./routes/website.routes.js";
import billingRouter from "./routes/billing.routes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js";

const app = express();

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

const port = process.env.PORT || 5000;

// Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https:/ai-workspace-i4lv.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // TEMP FIX (ALLOW ALL FRONTENDS)
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);
app.use("/api/billing", billingRouter);

app.listen(port, () => {
  console.log("Server started");
  connectDb();
});
