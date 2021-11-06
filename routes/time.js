const express = require("express");
const router = express.Router();

const Time = require("../models/Time");
const User = require("../models/User");
const Project = require("../models/Project");

//ADD TIME ENTRY
router.post("/zeiten", (req, res, next) => {
  Time.create({
    author: req.session.currentUser._id,
    project: req.body.project._id,
    date: req.body.date,
    timespan: req.body.timespan,
    servicePhase: req.body.servicephase,
    comment: req.body.comment,
    rate: req.session.currentUser.rate,
  }).then((response) => {
    res.json(response);
  });
});

//SHOW TIME ENTRIES
router.get("/zeiten", (req, res, next) => {
  Time.find()
    .populate("author")
    .populate("project")
    .then((allEntries) => {
      res.json(allEntries);
    });
});

// //EDIT ENTRY
// router.put('/zeiten/:id/bearbeiten', (req, res, next) => {
//     Time.findByIdAndUpdate(req.params.id, req.body, { new: true })
//       .then((project) => {
//         res.json(project);
//       })
// })

// //DELETE ENTRY
// router.delete("/zeiten/:id/loeschen", (req, res, next) => {
//   Time.findByIdAndRemove(req.params.id).then(() => {
//     res.json({
//       message: `Project with ${req.params.id} is removed successfully.`,
//     });
//   });
// });

module.exports = router;
