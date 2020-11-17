const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
  {
    type: {
    type: String,
    required: [true, "Please pick an exercise type"]
  },
  name: {
    type: String,
    required: [true, "Please enter a workout name"]
  },
  duration: {
    type: Number,
    min: [0, "Please enter a valid duration"]
  },
  weight: {
    type: Number,
    min: [0, "Please enter a weight"]
  },
  reps: {
    type: Number,
    min: [0, "Please enter a valid number of reps"]
  },
  sets: {
    type: Number,
    min: [0, "Please enter a valid number of sets"]
  }
}]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;