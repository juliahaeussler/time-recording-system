const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Invoice = require("../models/Invoice");

//SHOW TIME ENTRIES
router.get("/invoices", async (req, res, next) => {
  try {
    const { projectId } = req.query;
    let response;
    if (projectId) {
      response = await Invoice.find({ project: projectId });
    } else {
      response = await Invoice.find();
    }
    res.json(response);
  } catch (err) {
    console.log("GET invoices failed:", err);
  }
});

//ADD TIME ENTRY
router.post("/invoices", async (req, res, next) => {
  try {
    const response = await Invoice.create(req.body);
    res.json(response);
  } catch (err) {
    console.log("POST invoice failed:", err);
  }
});

module.exports = router;
