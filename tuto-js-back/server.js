import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from 'http';
import { Server } from "socket.io";

import {
  CourseRouter,
  TeacherRouter,
  StudentRouter,
  SectionRouter,
  TopicRouter,
  TutorshipRouter,
  TutorRouter,
  AdministratorRouter,
} from "./api/routes/_index.js";

dotenv.config();

// Connect to db
await mongoose.connect(process.env.MONGODB_TUTO_URL);

// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

// Express
const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io
const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_TUTO_URL,
    methods: ["GET", "POST"]
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("TUTO API");
});

app.use("/", CourseRouter);
app.use("/", TeacherRouter);
app.use("/", StudentRouter);
app.use("/", SectionRouter);
app.use("/", TopicRouter);
app.use("/", TutorRouter);
app.use("/", TutorshipRouter);
app.use("/", AdministratorRouter);

// Launch server
server.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Se inició el servidor");
});

// Socket.io
io.on("connection", function (socket) {
  console.log("New connection");

  socket.on("create tutorship", function () {
    console.log("server: create tutorship");
    io.emit("update tutorship list");
  });
});
