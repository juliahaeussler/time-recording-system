const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  // logger: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: true,
});

//GET EMAIL
router.get("/contact", async (req, res, next) => {
  try {
    res.json({ msg: "ok" });
  } catch (err) {
    console.log("POST contact message failed:", err);
  }
});

//SEND EMAIL
router.post("/contact", async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
      from: name,
      to: process.env.MAIL,
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
                 <p>Email: ${email}</p>
                 <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.log(error);
        res.json({
          status: "error",
          msg: "Nachricht konnte nicht versendet werden.",
        });
      } else {
        res.json({ status: "success", msg: "Nachricht wurde versendet." });
      }
    });
  } catch (err) {
    console.log("POST contact message failed:", err);
  }
});

module.exports = router;
