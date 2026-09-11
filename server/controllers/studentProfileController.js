const StudentProfile = require("../models/StudentProfile");

// skills arrives as a comma-separated string from the form; the model
// expects an array, so split it here rather than storing one blob string.
const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) return skills;
  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};



exports.createProfile = async (req, res) => {
  try {
    const existing = await StudentProfile.findOne({ user: req.user._id });

    if (existing) {
      return res.status(400).json({
        message: "Profile already exists — use update instead",
      });
    }

    const profile = await StudentProfile.create({
      user: req.user._id,
      ...req.body,
      skills: normalizeSkills(req.body.skills),
      resume: req.files?.resume?.[0] ? `/uploads/${req.files.resume[0].filename}` : "",
      portfolio: req.files?.portfolio?.[0] ? `/uploads/${req.files.portfolio[0].filename}` : "",
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      user: req.user._id,
    }).populate("user", "name email");

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    const update = {
      ...req.body,
    };

    if (req.body.skills !== undefined) {
      update.skills = normalizeSkills(req.body.skills);
    }

    if (req.files?.resume?.[0]) {
      update.resume = `/uploads/${req.files.resume[0].filename}`;
    }

    if (req.files?.portfolio?.[0]) {
      update.portfolio = `/uploads/${req.files.portfolio[0].filename}`;
    }

    const profile = await StudentProfile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      update,
      {
        new: true,
        upsert: true,
      }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
