const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Time = require("../models/Time");

//SHOW TIME ENTRIES
router.get("/time_entries", async (req, res, next) => {
  try {
    const response = await Time.find();
    res.json(response);
  } catch (err) {
    console.log("GET time entries failed:", err);
  }
});

//SHOW ONE PROJECT
// router.get("/projects/:id", async (req, res, next) => {
//   try {
//     const response = await Project.findById(req.params.id);
//     res.json(project);
//   } catch (err) {
//     console.log(`GET project with ID ${req.params.id} failed:`, err);
//   }
// });

//ADD TIME ENTRY
router.post("/time_entries", async (req, res, next) => {
  try {
    const response = await Time.create(req.body);
    res.json(response);
  } catch (err) {
    console.log("POST time entry failed:", err);
  }
});

// EDIT TIME ENTRY
router.put("/time_entries/:id", async (req, res, next) => {
  try {
    const response = await Time.findByIdAndUpdate(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    console.log(`PUT time entry with ID ${req.params.id} failed:`, err);
  }
});

//DELETE PROJECT
// router.delete("/projects/:id", async (req, res, next) => {
//   try {
//     const response = await Project.findByIdAndRemove(req.params.id);
//     res.json(response);
//   } catch (err) {
//     console.log(`DELETE project with ID ${req.params.id} failed:`, err);
//   }
// });

module.exports = router;
