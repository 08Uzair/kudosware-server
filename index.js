// app.js
import express from "express";
import { userRouter } from "./routes/Auth.js";
const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(8800, () => {
  console.log("Server is running on port 8800");

});
