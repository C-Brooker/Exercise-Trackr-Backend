const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    exerciseName: { type: String, required: true },
    exerciseReps: { type: Number, required: true },
    exerciseSets: { type: Number, required: true },
    exerciseFreq: { type: Number, required: true },
    exerciseDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const ExerciseDTO = mongoose.model("Exercise", exerciseSchema);

module.exports = ExerciseDTO;
