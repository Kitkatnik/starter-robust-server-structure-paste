const express = require("express");
const app = express();
const pastes = require("./data/pastes-data");

app.use(express.json());

const usersRouter = require("./users/users.router");
const pastesRouter = require("./pastes/pastes.router");

app.use("/users", usersRouter);
app.use("/pastes", pastesRouter);

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
