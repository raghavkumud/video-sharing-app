import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your own account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "User has been deleted",
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your own account"));
  }
};

export const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscriptions: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $push: { subscribers: req.user.id },
    });
    return res.status(200).json({
      success: true,
      message: "Subscription successful",
    });
  } catch (err) {
    next(err);
  }
};

export const unsubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscriptions: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { subscribers: req.user.id },
    });
    return res.status(200).json({
      success: true,
      message: "Unsubscription successful",
    });
  } catch (err) {
    next(err);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.id;
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    return res.status(200).json({
      success: true,
      message: "Video has been liked",
    });
  } catch (err) {
    next(err);
  }
};

export const unlikeVideo = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.id;
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    return res.status(200).json({
      success: true,
      message: "Video has been unliked",
    });
  } catch (err) {
    next(err);
  }
};
