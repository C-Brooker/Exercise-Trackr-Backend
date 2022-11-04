const express = require("express"); //Need express router because creating route
const router = express.Router();

let UserDTO = require("../models/User.model"); //Need user model

router.route("/").get((req, res) => {
  //Creating routes ,Handles incoming git requests
  UserDTO.find() //Find returns a promise so the result is in json format
    .then((users) => res.json(users)) //return the users in json format
    .catch((err) => req.status(400).json("Error: " + err)); //If error return error message
});

router.route("/add").post((req, res) => {
  //If route has /add after it will run, .post means sending
  const username = req.body.username; //Create a constant for the objects in the data entry

  const newUser = new UserDTO({ username });

  newUser
    .save() //using save method to save user to database
    .then(() => res.json("User Added!")) //If successful returns useradded otherwise error
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
