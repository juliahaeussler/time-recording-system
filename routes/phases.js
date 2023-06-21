const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Phase = require("../models/Phase");

//SHOW PHASES
router.get("/phases", async (req, res, next) => {
  try {
    const phases = await Phase.find();
    res.json(phases);
  } catch (err) {
    console.log("GET phases failed:", err);
  }
});

module.exports = router;