const express = require("express");

const router = express.Router();


const {
createDrive,
getDrives,
registerStudent,
deleteDrive
}=require("../controllers/driveController");


const authMiddleware =
require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");



router.post(
"/",
authMiddleware,
authorize("admin", "recruiter"),
createDrive
);



router.get(
"/",
authMiddleware,
getDrives
);



router.post(
"/:id/register",
authMiddleware,
authorize("student"),
registerStudent
);



router.delete(
"/:id",
authMiddleware,
authorize("admin", "recruiter"),
deleteDrive
);



module.exports = router;
