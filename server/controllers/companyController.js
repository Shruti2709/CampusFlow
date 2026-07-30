const Company = require("../models/Company");



exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      logo: req.file ? `/uploads/${req.file.filename}` : "",
      createdBy: req.user.id,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.getCompanies = async (req, res) => {
  try {
    // Recruiters only manage/see their own companies.
    // Admins and students can browse every company.
    const filter =
      req.user.role === "recruiter" ? { createdBy: req.user.id } : {};

    const companies = await Company.find(filter).sort({ createdAt: -1 });

    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const isOwner =
      company.createdBy && company.createdBy.toString() === req.user.id;

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({
        message: "You can only delete companies you created",
      });
    }

    await Company.findByIdAndDelete(req.params.id);

    res.json({
      message: "Company deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
