import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connection.js";
import cors from "cors"
import { adminRouter, authRouter, headRouter, studentRouter, supervisorRouter } from "./src/modules/index.router.js";
dotenv.config();
const app = express();
const port = 3000 || process.env.PORT;
connectDB();
app.use(express.json());
app.use(cors())
const BASE_URL = process.env.BASE_URL;

app.use(`${BASE_URL}auth`, authRouter);
app.use(`${BASE_URL}admin`, adminRouter);
app.use(`${BASE_URL}head`,headRouter);
app.use(`${BASE_URL}student`,studentRouter);
app.use(`${BASE_URL}supervisor`,supervisorRouter);
app.use("*", (req, res) => {
  res.status(404).json({ message: "page is not found" });
});

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err["cause"])
      .json({ message: "catch error", error: err.message });
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
