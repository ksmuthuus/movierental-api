const express = require("express");
const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const auth = require('../middlewares/auth')
const {
  returnError
} = require("../common/error");
const {
  User,
  validate
} = require("../models/user");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.status(200).send(user)
})

router.post("/", async (req, res) => {
  //Validate payload
  const validated = validate(req.body);
  if (validated.error) {
    returnError(
      res,
      400,
      "ValidationException",
      validated.error.details[0].message
    ); //TO DO enumerate details
  }

  //Check if user already exists
  let user = undefined;
  try {
    user = await User.findOne({
      email: req.body.email
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }

  if (user)
    return res.status(400).send({
      message: "User Already exists"
    });

  //Insert Genre
  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  user.password = await bcryptjs.hash(user.password, 10);

  try {
    await user.save();
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }

  const token = user.generateAuthToken()

  res.header('x-auth-token', token).status(201).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;