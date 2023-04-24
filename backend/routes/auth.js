import express from "express";
import { logOutUser, signin, signup } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/logOut", logOutUser);

export default router;
