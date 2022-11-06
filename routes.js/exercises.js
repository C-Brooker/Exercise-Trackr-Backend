const express = require("express");
const router = express.Router();

let ExerciseDTO = require("../models/Exercise.model");

router.route("/").get((req, res) => {
  //Get requests will use res
  ExerciseDTO.find()
    .then((exercises) =>
      res.status(200).json({
        status: res.statusCode,
        message: "successfully retrieved!",
        body: exercises,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  console.log(req.body);
  //Post requests will use req
  const exerciseName = req.body.exerciseName;
  const exerciseReps = Number(req.body.exerciseReps);
  const exerciseSets = Number(req.body.exerciseSets); //When a number use this
  const exerciseWeight = Number(req.body.exerciseWeight); //When a date use this
  const exerciseDate = Date.parse(req.body.exerciseDate);

  const newExercise = new ExerciseDTO({
    //When more than one field use this layout to store the objects
    exerciseName,
    exerciseReps,
    exerciseSets,
    exerciseWeight,
    exerciseDate,
  });

  //Res for response, req for requests
  newExercise
    .save() //Saving exercise
    .then(() =>
      res.status(200).json({
        status: res.statusCode,
        message: "Exercise Succesfully Added!",
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  ExerciseDTO.findById(id)
    .then((exercise) =>
      res.status(200).json({
        status: res.statusCode,
        message: `Exercise ${id} Successfully Retrieved!`,
        body: exercise,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  console.log("Working!");
  const id = req.params.id;
  ExerciseDTO.findByIdAndDelete(id)
    .then(() =>
      res.status(200).json({
        status: res.statusCode,
        message: `Exercise ${id} Succesfully Deleted!`,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  ExerciseDTO.findById(id)
    .then((exercise) => {
      exercise.exerciseName = req.body.exerciseName;
      exercise.exerciseReps = Number(req.body.exerciseReps);
      exercise.exerciseSets = Number(req.body.exerciseSets);
      exercise.exerciseWeight = Number(req.body.exerciseWeight);
      exercise.exerciseDate = Date.parse(req.body.exerciseDate);

      exercise
        .save()
        .then(() =>
          res.status(200).json({
            status: res.statusCode,
            message: `Exercise ${id} Succesfully Updated!`,
          })
        )
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
