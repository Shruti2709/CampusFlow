const LostFoundItem = require("../models/LostFoundItem");

// POST /api/lost-found  (student only) — file a lost item report
exports.createItem = async (req, res) => {
  try {
    const { itemName, description, location } = req.body;

    const item = await LostFoundItem.create({
      reportedBy: req.user.id,
      itemName,
      description,
      location,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/lost-found
// Everyone allowed (students + admin) sees the full board so lost items can
// be recognized and returned; recruiters never reach this route at all.
exports.getItems = async (req, res) => {
  try {
    const items = await LostFoundItem.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PATCH /api/lost-found/:id/status — mark an item Found
// Only the student who reported it (or an admin) may update it.
exports.updateItemStatus = async (req, res) => {
  try {
    const item = await LostFoundItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const isOwner = item.reportedBy.toString() === req.user.id;

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({
        message: "You can only update items you reported",
      });
    }

    const { status } = req.body;

    if (status) {
      item.status = status;
      item.foundAt = status === "Found" ? new Date() : undefined;
    }

    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
