const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/Project');

router.get('/test', (req, res, next) => {
  res.json({msg: 'test'})
});

//SHOW PROJECTS
router.get('/projects', (req, res, next) => {
    Project.find()
      .then(allProjects => {
        console.log('allProjects', allProjects)
        res.json(allProjects);
    })
});

//SHOW ONE PROJECT
router.get('/projects/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      res.json(project);
  })
});

//ADD PROJECT
router.post('/projects', (req, res, next) => {
  Project.create({
    name: req.body.name,
    number: req.body.number,
    date: req.body.date,
    note: req.body.note,
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
