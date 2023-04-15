import express from "express";
import {
  createVideo,
  deleteVideo,
  getVideo,
  updateVideo,
  increaseViews,
  getTrendingVideos,
  getRandomVideos,
  subscribersVideos,
  getVideosByTags,
  searchVideosByTitle,
} from "../controllers/Video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createVideo);

router.get("/sub", verifyToken, subscribersVideos);

router.get("/trend", getTrendingVideos);

router.get("/random", getRandomVideos);

router.get("/tags", getVideosByTags);

router.get("/search", searchVideosByTitle);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

router.get("/:id", getVideo);

router.put("/view/:id", increaseViews);

export default router;
