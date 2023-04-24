import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "User has been created",
    });
  } catch (error) {
    let err = createError(500, "Some error occurred");
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      name: req.body.name,
    });
    if (!user) return next(createError(404, "User not found"));
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Password"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        user,
      });
  } catch (error) {
    next(error);
  }
};

export const logOutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({
      success: true,
      message: "You're logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};
