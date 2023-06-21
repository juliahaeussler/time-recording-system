const mongoose = require("mongoose");

const phaseSchema = new mongoose.Schema(
  {
    label: String,
  },
  { collection: "phases" }
);

const Phase = mongoose.model("Phase", phaseSchema);

module.exports = Phase;
