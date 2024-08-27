import express from "express";
import { getUsers, addUser } from "../controller/user.js";
export const userRouter = express.Router();
userRouter.post("/", addUser);
userRouter.get("/", getUsers);
