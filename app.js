import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connection.js";
import cors from "cors";
import http from "http"; // Import 'http' module
// import WebSocket from 'ws'; // Import 'ws' module for WebSocket
// import { Server } from "socket.io"; // Import 'Server' from 'socket.io'
import { adminRouter, authRouter, headRouter, studentRouter, supervisorRouter, chatRouter } from "./src/modules/index.router.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server using Express app
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors());

const BASE_URL = process.env.BASE_URL;

app.use(`${BASE_URL}auth`, authRouter);
app.use(`${BASE_URL}admin`, adminRouter);
app.use(`${BASE_URL}head`, headRouter);
app.use(`${BASE_URL}student`, studentRouter);
app.use(`${BASE_URL}supervisor`, supervisorRouter);
app.use(`${BASE_URL}chat`, chatRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "page is not found" });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(err["cause"]).json({ message: "catch error", error: err.message });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
