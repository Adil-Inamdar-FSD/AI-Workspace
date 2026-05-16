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
const port = process.env.PORT || 5000;

/* ---------------- STRIPE WEBHOOK (MUST BE BEFORE JSON) ---------------- */
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

/* ---------------- CORS CONFIG (FIXED) ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-workspace-i4lv.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server or postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // SAFE fallback (prevents Render CORS crashes)
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/* ---------------- HANDLE PRE-FLIGHT REQUESTS ---------------- */
app.options("*", cors());

/* ---------------- MIDDLEWARES ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------------- DB CONNECTION ---------------- */
connectDb();

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);
app.use("/api/billing", billingRouter);

/* ---------------- START SERVER ---------------- */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
