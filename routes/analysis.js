var express = require('express');
var router = express.Router();

const Time = require("../models/Time");
const User = require("../models/User");
const Project = require("../models/Project");


// SHOW ALL TIME ENTRIES FROM ONE PROJECT
// router.post("/auswertung/projekt", (req, res, next) => {
//     Time.create({
//       author: req.session.currentUser._id,
//       project: req.body.project,
//       date: req.body.date,
//       timespanHours: req.body.timespanHours,
//       timespanMins: req.body.timespanMins,
//       servicePhase: req.body.servicePhase,
//       comment: req.body.comment,
//       rate: req.body.rate,
//     }).then((newEntry) => {
//       Time.findById(newEntry._id)
//         .populate("project")
//         .then((timeWithProject) => {
//           res.json(timeWithProject);
//         });
//     });
// });

router.get('/auswertung/:id', (req, res, next) => {
 
  Time.find({ project: req.params.id }).populate('project')
    .then(timeWithProject => {
     
      res.json(timeWithProject);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;