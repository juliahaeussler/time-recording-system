const express = require("express");
const router = express.Router();

// CHECK USER
router.get("/check-auth", (req, res, next) => {
  if (req.session.currentUser) {
    res.json({ user: req.session.currentUser });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;
