const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  /* get data from frontend */
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  /* else check if user is already there  */
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "email already registered " });
      }
      /* else create the user */
      const user = new User({
        email,
        password,
        name,
      });
      user
        .save()
        .then((user) => {
          res.json({ message: "saved user success" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
