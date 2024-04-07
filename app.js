const express = require("express");

const app = express();

app.get("/test", (req, res) => res.json({ message: "Test Zen" }));

module.exports = app;
