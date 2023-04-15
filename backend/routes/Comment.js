import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  deleteComment,
  getComments,
  addComment,
} from "../controllers/Comment.js";
const router = express.Router();

router.get("/:id", verifyToken, getComments);
router.post("/:id", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;
