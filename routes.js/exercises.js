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
  const exerciseName = req.body.exerciseName;
  const exerciseReps = Number(req.body.exerciseReps);
  const exerciseSets = Number(req.body.exerciseSets); //When a number use this
  const exerciseFreq = Number(req.body.exerciseFreq); //When a date use this
  const exerciseDate = Date.parse(req.body.exerciseDate);

  const newExercise = new ExerciseDTO({
    //When more than one field use this layout to store the objects
    exerciseName,
    exerciseReps,
    exerciseSets,
    exerciseFreq,
    exerciseDate,
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
      exercise.exerciseName = req.body.exerciseName;
      exercise.exerciseReps = Number(req.body.exerciseReps);
      exercise.exerciseSets = Number(req.body.exerciseSets);
      exercise.exerciseFreq = Number(req.body.exerciseFreq);
      exercise.exerciseDate = Date.parse(req.body.exerciseDate);

      exercise
        .save()
        .then(() => res.json("Exercise Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
