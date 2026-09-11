const express = require("express");

const router = express.Router();

const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Students file complaints; admins review them. Recruiters get no access
// to any route in this file.

router.post(
  "/",
  authMiddleware,
  authorize("student"),
  createComplaint
);

router.get(
  "/",
  authMiddleware,
  authorize("student", "admin"),
  getComplaints
);

router.patch(
  "/:id/status",
  authMiddleware,
  authorize("admin"),
  updateComplaintStatus
);

module.exports = router;
