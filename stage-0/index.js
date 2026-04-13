// const express = require("express");

// const app = express();

// app.get("/", async (req, res) => {
// 	const name = req.query.name;

// 	if (!name) {
// 		return res
// 			.status(400)
// 			.json({ status: "error", message: "<error message>" });
// 	}
// 	if (typeof name !== "string") {
// 		return res
// 			.status(422)
// 			.json({ status: "error", message: "<error message>" });


// 	}
// 	try {
// 		const reply = await fetch(`https://api.genderize.io?name=${name}`);
// 		const data = await reply.json();
// 		const is_confident = data.probability >= 0.7 && data.count


// 		return res.json({
// 			status: "success",
// 			data: {
// 				name: data.name,
// 				gender: data.gender,
// 				probability: data.probability,
// 				sample_size: data.count,
// 				is_confident: is_confident,
// 				processed_at: new Date().toISOString
// 			}
// 		})

// 	} catch (err) {
// 		res.status(500).json({ status: "error", message: "<error message>" });
// 	}

// });
// app.listen(3000);
