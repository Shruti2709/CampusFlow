const mongoose = require("mongoose");

const driveQuestionSchema = new mongoose.Schema(
  {
    drive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drive",
      required: true,
    },
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      default: "",
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    answeredAt: {
      type: Date,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DriveQuestion", driveQuestionSchema);
