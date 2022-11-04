const express = require("express");
const router = express.Router();

let ExerciseDTO = require("../models/Exercise.model");

router.route("/").get((req, res) => {
  //Get requests will use res
  ExerciseDTO.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  //Post requests will use req
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration); //When a number use this
  const date = Date.parse(req.body.date); //When a date use this

  const newExercise = new ExerciseDTO({
    //When more than one field use this layout to store the objects
    username,
    description,
    duration,
    date,
  });

  //Res for response, req for requests
  newExercise
    .save() //Saving exercise
    .then(() => res.json("Exercise Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  ExerciseDTO.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  ExerciseDTO.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  ExerciseDTO.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("ExerciseDTO Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
