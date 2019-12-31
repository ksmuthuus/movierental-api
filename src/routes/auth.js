const express = require("express");
const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const Joi = require("joi");

const {
  returnError
} = require("../common/error");
const {
  User
} = require("../models/user");

const router = express.Router();

//GET All Generas

router.post("/", async (req, res) => {
  //Validate payload
  let validated = validate(req.body);
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

  if (!user)
    return res.status(400).send({
      message: "Invalid username or password!"
    });

  //Validate password
  validated = await bcryptjs.compare(req.body.password, user.password);
  if (!validated)
    return res.status(400).send({
      message: "Invalid username or password!"
    });

  // const token = jwt.sign({
  //   id: user._id
  // }, config.get("jwtPrivateKey"));

  token = user.generateAuthToken()

  res.status(200).send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string()
      .min(8)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(25)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = router;