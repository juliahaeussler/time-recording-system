var express = require('express');
var router = express.Router();

const Time = require("../models/Time");
const User = require("../models/User");
const Project = require("../models/Project");


// SHOW ALL TIME ENTRIES FROM ONE PROJECT
router.get('/auswertung/:id', (req, res, next) => {
 
  Time.find({ project: req.params.id }).populate('project').populate('author')
    .then(timeWithProject => {
     
      res.json(timeWithProject);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;