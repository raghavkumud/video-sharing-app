import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    videoId: {
      type: String,
      required: true,
      ref: "Video",
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
