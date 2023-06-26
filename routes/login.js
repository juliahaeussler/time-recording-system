const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// LOG IN
router.post("/login", async (req, res, next) => {
  const foundUser = await User.findOne({ username: req.body.username });
  console.log(foundUser)

  if (!foundUser) {
    res.json({
      message: "Benutzername nicht vorhanden, bitte zuerst anlegen.",
    });
  } else {
    bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
      if (result) {
        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentUser = foundUser;
        res.json({ user: foundUser });
      } else {
        console.log("Error with login", err);
      }
    });
  }
});

//LOG OUT
router.post("/login/logout", (req, res, next) => {
  req.session.destroy();
  res.json({ status: "ok" });
});

module.exports = router;
