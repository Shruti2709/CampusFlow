const express = require("express");

const router = express.Router();

const {
  createItem,
  getItems,
  updateItemStatus,
} = require("../controllers/lostFoundController");

const authMiddleware = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Students report lost items and mark them found; admins can view the whole
// board. Recruiters get no access to any route in this file.

router.post(
  "/",
  authMiddleware,
  authorize("student"),
  createItem
);

router.get(
  "/",
  authMiddleware,
  authorize("student", "admin"),
  getItems
);

router.patch(
  "/:id/status",
  authMiddleware,
  authorize("student", "admin"),
  updateItemStatus
);

module.exports = router;
