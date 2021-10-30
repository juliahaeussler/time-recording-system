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

//DELETE PROJECT

module.exports = router;
