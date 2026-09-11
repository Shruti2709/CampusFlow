const express = require("express");

const router = express.Router();

const {
  createEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Admins create/manage events; students view the upcoming events list.
// Recruiters get no access to any route in this file.

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  createEvent
);

router.get(
  "/",
  authMiddleware,
  authorize("student", "admin"),
  getEvents
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteEvent
);

module.exports = router;
