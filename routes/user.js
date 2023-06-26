const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// SIGN UP
router.post("/user", async (req, res, next) => {
    console.log('touch /user')
  const foundUser = await User.findOne({ username: req.body.username });
  if (foundUser) {
    res.json({ message: "Benutzername bereits vergeben." });
  } else {
    try {
      const saltRounds = 10;
      bcrypt.hash(
        req.body.password,
        saltRounds,
        async function (err, hashPass) {
          const newUser = new User({
            username: req.body.username,
            password: hashPass,
          });
          await newUser.save();
          res.json({ message: "Benutzer hinzugefügt." });
        }
      );
    } catch (err) {
      console.log("ERR", err);
    }
  }
});

module.exports = router;
