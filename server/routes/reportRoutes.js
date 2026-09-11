const express = require("express");
const router = express.Router();
const StudentProfile = require("../models/StudentProfile");
const PlacementDrive = require("../models/PlacementDrive");
const Company = require("../models/Company");
const Interview = require("../models/Interview");
const authMiddleware = require("../middleware/authMiddleware");

// GET placement analytics summary & structured report
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const students = await StudentProfile.find().populate("user", "name email");
    const drives = await PlacementDrive.find().populate("company", "name package");
    const companies = await Company.find();
    const interviews = await Interview.find().populate("student", "name").populate("company", "name");

    const totalStudents = students.length;
    const placedStudents = students.filter((s) => s.placementStatus?.toLowerCase() === "placed").length;
    const placementPercentage = totalStudents > 0 ? Math.round((placedStudents / totalStudents) * 100) : 0;

    // Branch breakdown
    const branchStats = {};
    students.forEach((s) => {
      const branch = s.branch || "General";
      if (!branchStats[branch]) {
        branchStats[branch] = { total: 0, placed: 0 };
      }
      branchStats[branch].total++;
      if (s.placementStatus?.toLowerCase() === "placed") {
        branchStats[branch].placed++;
      }
    });

    res.json({
      totalStudents,
      placedStudents,
      placementPercentage,
      totalDrives: drives.length,
      totalCompanies: companies.length,
      totalInterviews: interviews.length,
      branchStats,
      academicYear: "2026-27",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate placement report" });
  }
});

// GET CSV export stream of all students and their placement records
router.get("/export-csv", authMiddleware, async (req, res) => {
  try {
    const students = await StudentProfile.find().populate("user", "name email");

    let csvContent = "Full Name,Email,Phone,Department/Branch,CGPA,Placement Status,Technical Skills\n";

    students.forEach((s) => {
      const name = s.user?.name || s.name || "";
      const email = s.user?.email || s.email || "";
      const skills = Array.isArray(s.skills) ? s.skills.join(" | ") : s.skills || "N/A";
      const line = `"${name}","${email}","${s.phone || ""}","${s.branch || ""}","${s.cgpa || ""}","${s.placementStatus || "Eligible"}","${String(skills).replace(/"/g, '""')}"\n`;
      csvContent += line;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="CampusFlow_Placement_Report_2026-27.csv"');
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ message: "Failed to export CSV" });
  }
});

module.exports = router;

