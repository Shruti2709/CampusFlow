const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Data Structures & Algorithms", "DBMS & SQL", "Core Java & OOP", "General Aptitude"],
      required: true,
    },
    durationMinutes: {
      type: Number,
      default: 15,
    },
    totalMarks: {
      type: Number,
      default: 10,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctOptionIndex: { type: Number, required: true },
        explanation: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
