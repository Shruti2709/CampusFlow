const express = require("express");
const router = express.Router();
const DriveQuestion = require("../models/DriveQuestion");
const authMiddleware = require("../middleware/authMiddleware");


// GET all questions for a specific drive
router.get("/:driveId", authMiddleware, async (req, res) => {
  try {
    const questions = await DriveQuestion.find({ drive: req.params.driveId })
      .populate("askedBy", "name email role")
      .populate("answeredBy", "name role")
      .sort({ isPinned: -1, createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch drive questions" });
  }
});

// POST a new question on a drive
router.post("/:driveId", authMiddleware, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ message: "Question text is required" });
    }

    const newQuestion = await DriveQuestion.create({
      drive: req.params.driveId,
      askedBy: req.user._id,
      question: question.trim(),
    });

    const populated = await DriveQuestion.findById(newQuestion._id).populate("askedBy", "name email role");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to post question" });
  }
});

// PUT answer a question (Admin or Recruiter)
router.put("/:questionId/answer", authMiddleware, async (req, res) => {
  try {
    const { answer, isPinned } = req.body;
    if (req.user.role !== "admin" && req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only administrators and recruiters can answer drive questions" });
    }

    const updated = await DriveQuestion.findByIdAndUpdate(
      req.params.questionId,
      {
        answer: answer ? answer.trim() : "",
        answeredBy: req.user._id,
        answeredAt: new Date(),
        ...(isPinned !== undefined && { isPinned: Boolean(isPinned) }),
      },
      { new: true }
    )
      .populate("askedBy", "name email role")
      .populate("answeredBy", "name role");

    if (!updated) return res.status(404).json({ message: "Question not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit answer" });
  }
});

module.exports = router;
