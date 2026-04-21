const mongoose = require("mongoose");
require("dotenv/config");
const fs = require("fs");
const Profile = require("./models/profileDb");

const raw = fs.readFileSync(__dirname + "/profiles.json", "utf-8");
const { profiles } = JSON.parse(raw);

mongoose
	.connect(process.env.MONGO_URI)
	.then(async () => {
		try {
			await Profile.insertMany(profiles, { ordered: false });
			console.log("Profiles seeded");
			process.exit();
		} catch (err) {
			console.log(err);
		}
	})
	.catch((err) => console.log(err));
