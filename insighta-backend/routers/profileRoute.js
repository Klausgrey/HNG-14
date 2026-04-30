const express = require("express");
const router = express.Router();
const {
	getProfiles,
	searchProfiles,
	createProfile,
} = require("../controls/profileController");

router.get("/", getProfiles);
router.get("/search", searchProfiles);
router.post("/", createProfile);

module.exports = router;
