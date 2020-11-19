const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// const PORT = process.env.PORT || 3000;

const Workout = require("./models/workoutModel");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useFindAndModify: false
});

const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

// api routes

// getLastWorkout
app.get("/api/workouts", (req, res) => {
  db.workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });  
});

// addExercise
app.put("/api/workouts/:id", (req, res) => {
  db.workouts.update(
    {
      _id: mongojs.ObjectID(req.params.id)

    },
    {
      $push: {
        exercises: {  
          type: req.body.type,
          name: req.body.name,
          duration: req.body.duration,
          distance: req.body.distance,
          weight: req.body.weight,
          reps: req.body.reps,
          sets: req.body.sets
        } 
      }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// createWorkout
app.post("/api/workouts", ({body}, res) => {
  const workout = new Workout(body);
  db.workouts.insert(workout, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

//getWorkoutsInRange
app.get("/api/workouts/range", (req, res) => {
  db.workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

// html routes
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// needs to be listed last.  catch all if route is typed in incorrectly
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.listen(3000, () => {
  console.log("App running on port 3000!");
});