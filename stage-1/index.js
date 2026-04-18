const express = require("express");
const cors = require("cors");
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/profiles", profileRoutes);

mongoose
	.connect(MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

module.exports = app;
