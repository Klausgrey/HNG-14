const express = require("express");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/classify", async (req, res) => {
	const name = req.query.name;

	if (!name) {
		return res
			.status(400)
			.json({ status: "error", message: "name is missing" });
	}
	if (typeof name !== "string") {
		return res
			.status(422)
			.json({ status: "error", message: "name is wrong type" });
	}

	try {
		const reply = await fetch(`https://api.genderize.io?name=${name}`);
		const data = await reply.json();

		if (data.gender === null || data.count === 0) {
			return res.json({
				status: "error",
				message: "No prediction available for the provided name",
			});
		}

		const is_confident = data.probability >= 0.7 && data.count >= 100;

		res.status(200).json({
			status: "success",
			data: {
				name: data.name,
				gender: data.gender,
				probability: data.probability,
				sample_size: data.count,
				is_confident: is_confident,
				processed_at: new Date().toISOString(),
			},
		});
	} catch (err) {
		res
			.status(500)
			.json({ status: "error", message: "something went wrong on the server" });
	}
});

app.listen(PORT, () => {
	console.log("Running on port " + PORT);
});
