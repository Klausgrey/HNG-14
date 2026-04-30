const Profile = require("../models/profileDb");
const parseQuery = require("../utils/nlpParser");

const getProfiles = async (req, res) => {
	try {
		const filter = {};

		if (req.query.gender) filter.gender = req.query.gender;
		if (req.query.min_age)
			filter.age = { ...filter.age, $gte: Number(req.query.min_age) };

		if (req.query.max_age)
			filter.age = { ...filter.age, $lte: Number(req.query.max_age) };

		if (req.query.min_gender_probability)
			filter.gender_probability = {
				$gte: Number(req.query.min_gender_probability),
			};

		if (req.query.age_group) filter.age_group = req.query.age_group;

		if (req.query.country_id) filter.country_id = req.query.country_id;

		if (req.query.min_country_probability)
			filter.country_probability = {
				$gte: Number(req.query.min_country_probability),
			};

		const validSortFields = ["age", "created_at", "gender_probability"];
		if (req.query.sort_by && !validSortFields.includes(req.query.sort_by))
			return res
				.status(422)
				.json({ status: "error", message: "Invalid query parameter" });
		const sort = {};

		if (req.query.sort_by) {
			sort[req.query.sort_by] = req.query.order === "desc" ? -1 : 1;
		}

		const page = Math.max(1, parseInt(req.query.page, 10) || 1);
		const limit = Math.min(
			50,
			Math.max(1, parseInt(req.query.limit, 10) || 10),
		);
		const skip = (page - 1) * limit;

		const [profiles, total] = await Promise.all([
			Profile.find(filter).sort(sort).skip(skip).limit(limit),
			Profile.countDocuments(filter),
		]);

		res.status(200).json({
			status: "success",
			page: page,
			limit: limit,
			total: total,
			data: profiles,
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ status: "error", message: "Server error" });
	}
};

const searchProfiles = async (req, res) => {
	try {
		const q = req.query.q;
		if (!q)
			return res
				.status(400)
				.json({ status: "error", message: "Missing query parameter" });

		const result = parseQuery(q);
		if (Object.keys(result).length === 0)
			return res
				.status(400)
				.json({ status: "error", message: "Unable to interpret query" });

		const filter = {};

		if (result.gender) filter.gender = result.gender;
		if (result.min_age)
			filter.age = { ...filter.age, $gte: Number(result.min_age) };

		if (result.max_age)
			filter.age = { ...filter.age, $lte: Number(result.max_age) };

		if (result.min_gender_probability)
			filter.gender_probability = {
				$gte: Number(result.min_gender_probability),
			};

		if (result.age_group) filter.age_group = result.age_group;

		if (result.country_id) filter.country_id = result.country_id;

		if (result.min_country_probability)
			filter.country_probability = {
				$gte: Number(result.min_country_probability),
			};

		const page = Math.max(1, parseInt(req.query.page, 10) || 1);
		const limit = Math.min(
			50,
			Math.max(1, parseInt(req.query.limit, 10) || 10),
		);
		const skip = (page - 1) * limit;

		const [profiles, total] = await Promise.all([
			Profile.find(filter).skip(skip).limit(limit),
			Profile.countDocuments(filter),
		]);

		res.status(200).json({
			status: "success",
			page: page,
			limit: limit,
			total: total,
			data: profiles,
		});
	} catch (err) {
		res.status(500).json({ status: "error", message: "Server error" });
	}
};

const createProfile = async (req, res) => {
	const {
		name,
		gender,
		gender_probability,
		age,
		age_group,
		country_id,
		country_name,
		country_probability,
	} = req.body;

	try {
		const result = await Profile.create({
			name,
			gender,
			gender_probability,
			age,
			age_group,
			country_id,
			country_name,
			country_probability,
		});

		res.status(201).json({ status: "success", data: result });
	} catch (err) {
		console.log(err)
		if (err.name === "ValidationError")
			return res.status(422).json({ status: "error", message: err.message });
		res.status(500).json({ status: "error", message: "Server error" });
	}
};

module.exports = { getProfiles, searchProfiles, createProfile };
