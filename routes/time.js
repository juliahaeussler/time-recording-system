const express = require("express");
const router = express.Router();

const Time = require("../models/Time");
const User = require("../models/User");
const Project = require("../models/Project");

//ADD TIME ENTRY
router.post("/zeiten", (req, res, next) => {
  
  User.findById(req.session.currentUser._id).then((user) => {
    
    Time.create({
      author: req.session.currentUser._id,
      project: req.body.project,
      date: req.body.date,
      timespanHours: req.body.timespanHours,
      timespanMins: req.body.timespanMins,
      servicePhase: req.body.servicePhase,
      comment: req.body.comment,
      rate: user.rate,
    }).then((newEntry) => {
      Time.findById(newEntry._id)
        .populate("project")
        .then((timeWithProject) => {
          res.json(timeWithProject);
        });
    });
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

//SHOW ONE ENTRY
router.get('/zeiten/:id', (req, res, next) => {
  Time.findById(req.params.id)
    .populate("project")
    .then(entry => {
      res.json(entry);
  })
});

// //EDIT ENTRY
// router.put('/zeiten/:id/bearbeiten', (req, res, next) => {
//     Time.findByIdAndUpdate(req.params.id, req.body, { new: true })
//       .then((project) => {
//         res.json(project);
//       })
// })


//DELETE ENTRY
router.delete('/zeiten/:id/loeschen', (req, res, next) => {
  Time.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Time entry with ${req.params.id} is removed successfully.` });
    })
})


module.exports = router;
