const express = require('express')
const path = require("path");
const genreRouter = require("../routes/genre");
const customerRouter = require("../routes/customer");
const movieRouter = require("../routes/movie");
const rentalRouter = require("../routes/rental");
const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");
const defaultRouter = require("../routes/default");
const error = require("../middlewares/error");

module.exports = function (app) {
  //JSON Parser Middleware
  app.use(express.json()); //Sets req.body
  app.use(express.static(path.join(__dirname, "../public")));
  app.use("/api/genres", genreRouter);
  app.use("/api/customers", customerRouter);
  app.use("/api/movies", movieRouter);
  app.use("/api/rentals", rentalRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("*", defaultRouter);
  app.use(error);
}