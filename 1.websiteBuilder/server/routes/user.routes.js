import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();
app.use("/api/user", userRouter);

userRouter.get("/me", isAuth, getCurrentUser);

export default userRouter;
