const express = require("express");
const router = express.Router();
const { getProfiles, searchProfiles } = require("../controls/profileController");

router.get("/", getProfiles);
router.get("/search", searchProfiles);

module.exports = router;
