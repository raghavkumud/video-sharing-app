import Comment from "../models/Comment.js";

import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      ...req.body,
      videoId: req.params.id,
      userId: req.user.id,
    });
    const savedComment = await comment.save();
    const comments = await Comment.find().populate("userId");
    const userComments = comments.filter(
      (comment) => comment.userId === req.user.id
    );
    const otherComments = comments.filter(
      (comment) => comment.userId !== req.user.id
    );
    const shuffledComments = [...userComments, ...otherComments];
    return res.status(200).json({
      success: true,
      comments: shuffledComments,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.videoId);
    if (req.user.id === comment.userId || video.userId === req.user.id) {
      await Comment.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Comment has been deleted",
      });
    } else {
      next(createError(403, "You can only delete your comments"));
    }
  } catch (err) {
    next(err);
  }
};
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.id }).populate(
      "userId"
    );
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    next(err);
  }
};
