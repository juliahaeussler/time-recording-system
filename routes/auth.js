const express = require('express');
const router = express.Router();

const User = require('../models/User')

const bcrypt = require('bcryptjs')


// SIGN UP
router.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const rate = req.body.rate;
    const isAdmin = req.body.isAdmin;
    const isActive = req.body.isActive;
  
    User.findOne({ username: username }).then((foundUser) => {
      if (foundUser) {
        res.json({ message: 'Benutzername bereits vergeben.' });
           
      } else {
  
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
          username: username,
          password: hashPass,
          name: name,
          rate: rate,
          isAdmin: isAdmin,
          isActive: isActive,
        });
  
        aNewUser.save().then(() => {
          res.json({ message: 'Benutzer hinzugefügt.' })
          
        })
  
      }
    })
})

// LOG IN 
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(foundUser => {
      if (!foundUser) {
        res.json({ message: 'Benutzername nicht vorhanden, bitte zuerst anlegen.' })
      } else {
        if (bcrypt.compareSync(password, foundUser.password)) {


          //******* SAVE THE USER IN THE SESSION ********//
          req.session.currentUser = foundUser;

          res.json({ message: 'Benutzer angemeldet', user: foundUser })
          
        } else {
          res.json({ message: 'Passwort falsch' })
        }
      }
    })
}); 

// CHECK USER
router.get('/checkuser', (req, res, next) => {
  if (req.session.currentUser) {
    res.json({ userDoc: req.session.currentUser });
  } else {
    res.json({ userDoc: null });
  }
});

// GET USERS
router.get('/benutzer', (req, res, next) => {
  User.find()
    .then(allUsers => {
      res.json(allUsers);
    })
});

// GET ONE USER
router.get('/benutzer/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(response => {
      res.json(response);
  })
});

// EDIT USER


//LOG OUT
router.post('/logout', (req, res, next) => {
  req.session.destroy();
  
})


module.exports = router;