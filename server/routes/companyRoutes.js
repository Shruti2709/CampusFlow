const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createCompany,
  getCompanies,
  deleteCompany,
} = require("../controllers/companyController");

// Everyone logged in can browse companies (students need to see who's hiring).
router.get(
  "/",
  authMiddleware,
  getCompanies
);

// Only admins and recruiters can add companies.
router.post(
  "/",
  authMiddleware,
  authorize("admin", "recruiter"),
  upload.single("logo"),
  createCompany
);

// Ownership is checked inside the controller (admin or the recruiter who created it).
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin", "recruiter"),
  deleteCompany
);

module.exports = router;
