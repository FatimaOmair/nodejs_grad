import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connection.js";
import cors from "cors";
import http from "http"; // Import 'http' module
import { Server } from "socket.io"; // Import 'Server' from 'socket.io'
import { adminRouter, authRouter, headRouter, studentRouter, supervisorRouter, chatRouter } from "./src/modules/index.router.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server using Express app
const io = new Server(server, { // Create Socket.IO server instance attached to HTTP server
  pingTimeout: 6000, // Set ping timeout to 6000 milliseconds
  cors: {
    origin: "http://localhost:3001", // Allow connections from this origin
  },
});
const port = process.env.PORT || 3000;
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

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

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

