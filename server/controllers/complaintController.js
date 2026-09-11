const Complaint = require("../models/Complaint");

// POST /api/complaints  (student only)
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    const complaint = await Complaint.create({
      student: req.user.id,
      title,
      category: category || "General",
      description,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/complaints
// Students only see their own complaints, admins see every complaint.
exports.getComplaints = async (req, res) => {
  try {
    const filter = req.user.role === "student" ? { student: req.user.id } : {};

    const complaints = await Complaint.find(filter)
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PATCH /api/complaints/:id/status  (admin only)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (status) {
      complaint.status = status;
      complaint.resolvedAt = status === "Resolved" ? new Date() : undefined;
    }

    if (adminRemarks !== undefined) {
      complaint.adminRemarks = adminRemarks;
    }

    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
