const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
//const asyncMiddleware = require('../middlewares/async')

const {
  returnError
} = require("../common/error");
const {
  Genre,
  validate
} = require("../models/genre");

const router = express.Router();

//GET All Generas

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.status(200).send(genres);
});

//GET specific Generas
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    throw new Error('Genre Not Found')
  }
  res.status(200).send(genre);
});

//POST Genres
router.post("/", auth, async (req, res) => {
  //Validate payload
  const validated = validate(req.body);
  if (validated.error)
    throw new Error(validated.error)


  //Insert Genre
  const genre = new Genre({
    name: req.body.name
  });

  await genre.save();
  res.status(201).send(genre);
});

//PUT Genres
router.put("/:id", async (req, res) => {
  //Validate payload
  const validated = validate(req.body);
  if (validated.error) {
    throw new Error(validated.error)
  }

  const resultGenre = await Genre.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name
    }, {
      new: true
    }
  );

  if (!resultGenre) returnError(res, 404, "DataException", "Genre Not Found");

  //Update Genre
  res.status(200).send(resultGenre);
});

//DELETE Generes
router.delete("/:id", [auth, admin], async (req, res) => {
  var resultGenre = undefined;
  try {
    resultGenre = await Genre.findByIdAndRemove(req.params.id);
  } catch (err) {
    returnError(res, 400, "StorageException", err.message);
  }

  if (!resultGenre) returnError(res, 404, "DataException", "Genre Not Found");

  //Remove genre
  res.status(200).send(resultGenre);
});

module.exports = router;