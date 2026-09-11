const express = require("express");

const router = express.Router();


const {

createInterview,
getInterviews,
updateInterviewStatus,
deleteInterview

}=require("../controllers/interviewController");


const authMiddleware =
require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");



router.post(
"/",
authMiddleware,
authorize("admin", "recruiter"),
createInterview
);



router.get(
"/",
authMiddleware,
getInterviews
);



router.patch(
"/:id/status",
authMiddleware,
authorize("admin", "recruiter"),
updateInterviewStatus
);



router.delete(
"/:id",
authMiddleware,
authorize("admin", "recruiter"),
deleteInterview
);



module.exports = router;
