import express from "express";
import {
  deleteUser,
  likeVideo,
  unlikeVideo,
  subscribeUser,
  unsubscribeUser,
  updateUser,
  getUser,
} from "../controllers/User.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.get("/find/:id", getUser);

router.put("/sub/:id", verifyToken, subscribeUser);

router.put("/unsub/:id", verifyToken, unsubscribeUser);

router.put("/like/:id", verifyToken, likeVideo);

router.put("/unlike/:id", verifyToken, unlikeVideo);

export default router;
