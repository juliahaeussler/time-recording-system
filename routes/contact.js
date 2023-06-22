const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

// //TEST EMAIL
// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

//GET EMAIL
router.get("/contact", async (req, res, next) => {
    try {
      res.json({msg: 'ok'});
    } catch (err) {
      console.log("POST contact message failed:", err);
    }
  });

//SEND EMAIL
// router.post("/contact", async (req, res, next) => {
//   try {
//     res.json({msg: 'ok'});
//     // const name = req.body.name;
//     // const email = req.body.email;
//     // const message = req.body.message;
//     // const mail = {
//     //   from: name,
//     //   to: process.env.MAIL,
//     //   subject: "Contact Form Submission",
//     //   html: `<p>Name: ${name}</p>
//     //              <p>Email: ${email}</p>
//     //              <p>Message: ${message}</p>`,
//     // };
//     // contactEmail.sendMail(mail, (error) => {
//     //   if (error) {
//     //     res.json({ status: "ERROR" });
//     //   } else {
//     //     res.json({ status: "Message Sent" });
//     //   }
//     // });
//   } catch (err) {
//     console.log("POST contact message failed:", err);
//   }
// });

module.exports = router;
