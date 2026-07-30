const Event = require("../models/Event");

// POST /api/events  (admin only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/events — students + admin (recruiters never reach this route)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/events/:id  (admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
