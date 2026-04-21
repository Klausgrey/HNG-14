const countries = require("i18n-iso-countries");
const en = require("i18n-iso-countries/langs/en.json");

const parseQuery = (query) => {
	const q = query.toLowerCase();
	const filter = {};

	if (q.includes("female")) filter.gender = "female";
	else if (q.includes("male")) filter.gender = "male";

	if (q.includes("child")) filter.age_group = "child";
	else if (q.includes("teenager")) filter.age_group = "teenager";
	else if (q.includes("adult")) filter.age_group = "adult";
	else if (q.includes("senior")) filter.age_group = "senior";

	if (q.includes("young")) {
		filter.min_age = 16;
		filter.max_age = 24;
	}

	const aboveMatch = q.match(/above\s+(\d+)/);
	if (aboveMatch) filter.min_age = Number(aboveMatch[1]);

	const belowMatch = q.match(/below\s+(\d+)/);
	if (belowMatch) filter.max_age = Number(belowMatch[1]);

	countries.registerLocale(en);
	const isoMap = countries.getNames("en", { select: "official" });

	const countryMap = Object.fromEntries(
		Object.entries(isoMap).map(([code, name]) => [name.toLowerCase(), code]),
	);

	const country = q.match(/from\s+([a-z]+)/);
	if (country && countryMap[country[1]])
		filter.country_id = countryMap[country[1]];

	return filter;
};

module.exports = parseQuery;
