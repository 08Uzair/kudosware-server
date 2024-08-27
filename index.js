import express from "express";
import cors from "cors";
import { userRouter } from "./routes/Auth.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRouter);

app.listen(8900, () => {
  console.log("Server is running on port 8900");
});
