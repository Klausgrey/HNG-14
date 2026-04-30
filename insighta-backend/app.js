const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const profileRoute = require("./routers/profileRoute")

require("dotenv/config")
const MONGO_URI = process.env.MONGO_URI

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/profiles", profileRoute);

mongoose
	.connect(MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

module.exports = app