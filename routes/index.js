const express = require("express");

// Import our modular routers for /tips and /feedback
const notesRouter = require("./app");

const app = express();

app.use("/notes", notesRouter);

module.exports = app;