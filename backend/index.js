import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import taskRoute from "./routes/task.route.js";
import chatRoute from "./routes/chat.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/chat", chatRoute);

// Static files serving
app.use(express.static(path.join(__dirname, "Frontend", "dist")));

// Client-side routing
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});