import express from "express";
import { connectToDB } from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  problemRouter,
  userRouter,
  compileRouter,
  aiRouter,
} from "./routes/index.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(
  cors({
    origin: ["https://oj-project.netlify.app", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(cookieParser());

// Routes
app.use("/user", userRouter);
app.use("/problem", problemRouter);
app.use("/compile", compileRouter);
app.use("/ai", aiRouter);

connectToDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
