import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";
import path from "path";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";
import { createDefaultAdmin } from "../middleware/defaultAdmin.js";
import userRouter from "../router/user-router.js";
import taskRouter from "../router/task-router.js";

config();
const app = express();

const corsOption = {
  origin: process.env.REQUEST_URL,
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(limiter);
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


connectDB();
await createDefaultAdmin();

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

export default app;