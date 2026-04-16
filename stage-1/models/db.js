const { uuidv7 } = require("uuidv7");

const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: () => uuidv7(), // Set the default ID to a UUID v7 string
	},
	name: { type: String, required: true },
	gender: { type: String, required: true },
	gender_probability: { type: Number, required: true },
	count: { type: Number, required: true },
	age: { type: Number, required: true },
	age_group: { type: String, required: true },
	country_id: { type: String, required: true },
	country_probability: { type: Number, required: true },
	created_at: { type: Date, default: Date.now },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
