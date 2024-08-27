import express from "express";
import { getUsers, addUser, signin, signup } from "../controller/user.js";
export const userRouter = express.Router();
userRouter.post("/", addUser);
userRouter.get("/", getUsers);
userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
