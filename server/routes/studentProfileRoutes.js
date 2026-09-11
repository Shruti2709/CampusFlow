const express = require("express");

const router = express.Router();


const {
createProfile,
getProfile,
updateProfile
} = require("../controllers/studentProfileController");


const protect = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");



router.post(
"/",
protect,
authorize("student"),
upload.fields([{ name: "resume", maxCount: 1 }, { name: "portfolio", maxCount: 1 }]),
createProfile
);



router.get(
"/",
protect,
authorize("student"),
getProfile
);



router.put(
"/",
protect,
authorize("student"),
upload.fields([{ name: "resume", maxCount: 1 }, { name: "portfolio", maxCount: 1 }]),
updateProfile
);



module.exports = router;