const express = require("express");
const Data = require("../models/db");

const create = async (req, res) => {
	const name = req.body.name;

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
		const existingProfile = await Data.findOne({ name: name });
		if (existingProfile) {
			return res.status(200).json({
				status: "success",
				message: "Profile already exists",
				data: existingProfile,
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(502).json({
			status: "error",
			message: `There was an error`,
		});
	}

	try {
		const [result1, result2, result3] = await Promise.all([
			fetch(`https://api.genderize.io/?name=${name}`),
			fetch(`https://api.agify.io/?name=${name}`),
			fetch(`https://api.nationalize.io/?name=${name}`),
		]);

		const [genderData, ageData, nationData] = await Promise.all([
			result1.json(),
			result2.json(),
			result3.json(),
		]);

		if (!genderData.gender)
			return res.status(502).json({
				status: "502",
				message: `Genderize returned an invalid response`,
			});
		if (!ageData.age)
			return res.status(502).json({
				status: "502",
				message: `Agify returned an invalid response`,
			});
		if (!nationData.country)
			return res.status(502).json({
				status: "502",
				message: `Nationalize returned an invalid response`,
			});

		const age = ageData.age;

		// Determine category
		let category = "senior"; // Default
		if (age <= 12) category = "child";
		else if (age <= 19) category = "teenager";
		else if (age <= 59) category = "adult";

		const nationality = nationData.country.reduce((prev, current) =>
			prev.probability > current.probability ? prev : current,
		);

		const result = await Data.create({
			name: genderData.name,
			gender: genderData.gender,
			gender_probability: genderData.probability,
			count: genderData.count,
			age: ageData.age,
			age_group: category,
			country_id: nationality.country_id,
			country_probability: nationality.probability,
		});

		res.status(200).json({
			status: "success",
			data: {
				id: result.id,
				name: result.name,
				gender: result.gender,
				gender_probability: result.gender_probability,
				sample_size: result.count, //count from Genderize API
				age: result.age,
				age_group: result.age_group,
				country_id: nationality.country_id,
				country_probability: nationality.probability,
				created_at: result.created_at,
			},
		});
	} catch (err) {
		res
			.status(500)
			.json({ status: "error", message: "something went wrong on the server" });
	}
};

const getById = async (req, res) => {
	const userId = req.params.id;
	try {
		const check = await Data.findById(userId);

		if (!check)
			return res
				.status(404)
				.json({ status: "error", message: "Profile not found" });

		res.status(200).json({
			status: "success",
			data: check,
		});
	} catch (err) {
		res
			.status(500)
			.json({ status: "error", message: "something went wrong on the server" });
	}
};

const getAll = async (req, res) => {
	try {
		const filter = {};
		if (req.query.gender) filter.gender = req.query.gender.toLowerCase();
		if (req.query.country_id)
			filter.country_id = req.query.country_id.toLowerCase();
		if (req.query.age_group)
			filter.age_group = req.query.age_group.toLowerCase();

		const result = await Data.find(filter);
		res.status(200).json({
			status: "success",
			count: result.length,
			data: result,
		});
	} catch (err) {
		res
			.status(500)
			.json({ status: "error", message: "something went wrong on the server" });
	}
};

const deleteById = async (req, res) => {
	const userId = req.params.id;

	try {
		await Data.findByIdAndDelete(userId);
		res.status(204).send();
	} catch (err) {
		res
			.status(500)
			.json({ status: "error", message: "something went wrong on the server" });
	}
};

module.exports = { create, getAll, getById, deleteById };
