const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Project = require("../models/Project");

//SHOW PROJECTS
router.get("/projects", async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.log("GET projects failed:", err);
  }
});

//SHOW ONE PROJECT
router.get("/projects/:id", async (req, res, next) => {
  try {
    const response = await Project.findById(req.params.id);
    res.json(response);
  } catch (err) {
    console.log(`GET project with ID ${req.params.id} failed:`, err);
  }
});

//ADD PROJECT
router.post("/projects", async (req, res, next) => {
  try {
    const response = await Project.create({
      name: req.body.name,
      number: req.body.number,
      date: req.body.date,
      note: req.body.note,
    });
    res.json(response);
  } catch (err) {
    console.log("POST project failed:", err);
  }
});

//EDIT PROJECT
router.put("/projects/:id", async (req, res, next) => {
  try {
    const response = await Project.findByIdAndUpdate(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    console.log(`PUT project with ID ${req.params.id} failed:`, err);
  }
});

//DELETE PROJECT
router.delete("/projects/:id", async (req, res, next) => {
  try {
    const response = await Project.findByIdAndRemove(req.params.id);
    res.json(response);
  } catch (err) {
    console.log(`DELETE project with ID ${req.params.id} failed:`, err);
  }
});

module.exports = router;
