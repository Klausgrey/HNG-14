const express = require("express");
const router = express.Router();
const {
	create,
	getAll,
	getById,
	deleteById,
} = require("../controls/profileController");

router.post("/", create);
router.post("/", getAll);
router.post("/:id", getById);
router.post("/:id", deleteById);

module.exports = router;
