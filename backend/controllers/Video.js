import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Requested video not found"));
    return res.status(200).json({
      success: true,
      video,
    });
  } catch (err) {
    return next(err);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();
    return res.status(201).json({
      success: true,
      video: savedVideo,
    });
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (video.userId === req.user.id) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        video: updatedVideo,
      });
    } else {
      return next(createError(403, "You can only update your own video"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (video.userId === req.user.id) {
      const updatedVideo = await Video.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Video has been deleted",
      });
    } else {
      return next(createError(403, "You can only delete your own video"));
    }
  } catch (err) {
    next(err);
  }
};

export const increaseViews = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      video,
    });
  } catch (err) {
    next(err);
  }
};

export const getTrendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

export const subscribersVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscriptions;
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    const nlist = list.flat();
    return res.status(200).json({
      success: true,
      videos: nlist,
    });
  } catch (err) {
    next(err);
  }
};


export const getVideosByTags = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",");
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    return next(err);
  }
};

export const searchVideosByTitle = async (req, res, next) => {
  try {
    const query = req.query.q;
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    return next(err);
  }
};
