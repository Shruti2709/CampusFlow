const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { adminOnly, authorize } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getStudents,
  createStudent,
  deleteStudent,
} = require("../controllers/StudentController");

// Recruiters may browse students (read-only) to see resumes; only admins manage the roster.
router.get("/", protect, authorize("admin", "recruiter"), getStudents);

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("resume"),
  createStudent
);

router.delete("/:id", protect, adminOnly, deleteStudent);

module.exports = router;