require("dotenv/config");
const express = require("express");
const app = require("./index");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server is running"));
