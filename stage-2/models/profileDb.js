const { uuidv7 } = require("uuidv7");
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
	{
		_id: { type: String, default: () => uuidv7() },
		name: { type: String, unique: true, required: true },
		gender: { type: String, required: true },
		gender_probability: { type: Number, required: true },
		age: { type: Number, required: true },
		age_group: { type: String, required: true },
		country_id: { type: String, required: true },
		country_name: { type: String, required: true },
		country_probability: { type: Number, required: true },
		created_at: { type: Date, default: Date.now },
	},
	{ versionKey: false },
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
