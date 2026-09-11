const Company = require("../models/Company");
const StudentProfile = require("../models/StudentProfile");
const PlacementDrive = require("../models/PlacementDrive");
const Interview = require("../models/Interview");

exports.getDashboardStats = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const profile = await StudentProfile.findOne({ user: req.user.id });

      const appliedDrives = profile
        ? await PlacementDrive.countDocuments({
            registeredStudents: profile._id,
          })
        : 0;

      const interviews = profile
        ? await Interview.countDocuments({ student: profile._id })
        : 0;

      return res.json({
        profileComplete: !!profile,
        appliedDrives,
        interviews,
        placementStatus: profile?.placementStatus || "Not Placed",
      });
    }

    // Recruiters only see stats scoped to what they created.
    const scopeFilter =
      req.user.role === "recruiter" ? { createdBy: req.user.id } : {};

    const totalCompanies = await Company.countDocuments(scopeFilter);
    const totalDrives = await PlacementDrive.countDocuments(scopeFilter);

    const totalStudents = await StudentProfile.countDocuments();
    const placedStudents = await StudentProfile.countDocuments({
      placementStatus: "Placed",
    });
    const totalInterviews = await Interview.countDocuments();

    res.json({
      totalStudents,
      totalCompanies,
      totalDrives,
      totalInterviews,
      placedStudents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
