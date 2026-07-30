const PlacementDrive = require("../models/PlacementDrive");
const StudentProfile = require("../models/StudentProfile");
const Company = require("../models/Company");



exports.createDrive = async (req, res) => {
  try {
    // Recruiters may only create drives for companies they own.
    if (req.user.role === "recruiter") {
      const company = await Company.findById(req.body.company);

      if (!company || company.createdBy?.toString() !== req.user.id) {
        return res.status(403).json({
          message: "You can only create drives for your own companies",
        });
      }
    }

    const drive = await PlacementDrive.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(drive);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.getDrives = async (req, res) => {
  try {
    const filter =
      req.user.role === "recruiter" ? { createdBy: req.user.id } : {};

    const canManage = req.user.role === "admin" || req.user.role === "recruiter";

    let query = PlacementDrive.find(filter).populate("company");

    query = canManage
      ? // Admins/recruiters see full applicant details, including resume/portfolio.
        query.populate({
          path: "registeredStudents",
          populate: { path: "user", select: "name email" },
        })
      : // Students only need enough to know whether *they* applied — no
        // classmates' names, emails, or resumes are exposed here.
        query.populate({
          path: "registeredStudents",
          select: "user",
          populate: { path: "user", select: "_id" },
        });

    const drives = await query.sort({ createdAt: -1 });

    res.json(drives);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.registerStudent = async (req, res) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id);

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    const profile = await StudentProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ message: "Complete your student profile before applying" });
    }

    const requiredCgpa = parseFloat(drive.eligibility?.cgpa);
    if (!isNaN(requiredCgpa) && (profile.cgpa === undefined || profile.cgpa < requiredCgpa)) {
      return res.status(403).json({
        message: `Not eligible — this drive requires a minimum CGPA of ${requiredCgpa}`,
      });
    }

    const allowedBranches = drive.eligibility?.branches || [];
    if (allowedBranches.length > 0 && !allowedBranches.includes(profile.branch)) {
      return res.status(403).json({
        message: `Not eligible — this drive is open to ${allowedBranches.join(", ")} only`,
      });
    }

    if (!drive.registeredStudents.includes(profile._id)) {
      drive.registeredStudents.push(profile._id);
    }

    await drive.save();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.deleteDrive = async (req, res) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id);

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    const isOwner =
      drive.createdBy && drive.createdBy.toString() === req.user.id;

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({
        message: "You can only delete drives you created",
      });
    }

    await PlacementDrive.findByIdAndDelete(req.params.id);

    res.json({
      message: "Drive deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
