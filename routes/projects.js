const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/Project');

//SHOW PROJECTS
router.get('/projekte', (req, res, next) => {
    Project.find()
      .then(allProjects => {
        res.json(allProjects);
    })
});

//SHOW ONE PROJECT
router.get('/projekte/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      res.json(project);
  })
});

//ADD PROJECT
router.post('/projekte', (req, res, next) => {
  Project.create({
    name: req.body.name,
    startDate: req.body.startDate,
    comment: req.body.comment,
    projectCode: req.body.projectCode,
  }).then((response) => {
    res.json(response);
  });
});

//EDIT PROJECT
router.patch('/projekte/:id/bearbeiten', (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((project) => {
      res.json(project);
    })
})

//DELETE PROJECT
router.delete('/projekte/:id/loeschen', (req, res, next) => {
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
})

module.exports = router;
