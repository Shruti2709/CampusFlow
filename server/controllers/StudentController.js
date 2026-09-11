const StudentProfile = require("../models/StudentProfile");
const User = require("../models/User");

// GET /api/students
exports.getStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const formatted = students.map((student) => ({
      _id: student._id,
      name: student.user?.name || "",
      email: student.user?.email || "",
      phone: student.phone,
      branch: student.branch,
      cgpa: student.cgpa,
      skills: student.skills,
      resume: student.resume,
      portfolio: student.portfolio,
      placementStatus: student.placementStatus,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST /api/students
exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      branch,
      cgpa,
      skills,
    } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: "student",
    });

    const profile = await StudentProfile.create({
      user: user._id,
      phone,
      branch,
      cgpa,
      skills: skills
        ? skills.split(",").map((item) => item.trim())
        : [],
      resume: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json(profile);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A student with this email already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const profile = await StudentProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await User.findByIdAndDelete(profile.user);

    await StudentProfile.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};