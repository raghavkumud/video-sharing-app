import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import VideoRouter from "./routes/Video.js";
import CommentRouter from "./routes/Comment.js";
import AuthRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

app.use("/api/users", UserRouter);
app.use("/api/videos", VideoRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/auth", AuthRouter);

const __dirname = path.resolve();
const dirPath = path.normalize(path.join(__dirname, "..", "frontend", "build"));

app.use(express.static(dirPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(dirPath, "index.html"));
});

app.use((err, req, res, next) => {
  try {
    let status = err.status || 500;
    let message = err.message || "Some error occurred!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
});
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log(`Connected to Database`))
  .catch((err) => {
    throw err;
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
