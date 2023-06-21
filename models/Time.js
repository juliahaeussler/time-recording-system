const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    date: {
      type: Date,
    },
    hours: {
      type: String,
    },
    mins: {
      type: String,
    },
    phase: {
      type: Schema.Types.ObjectId,
      ref: "Phase",
    },
    comment: {
      type: String,
    },
  },
  { collection: "time_entries" }
);

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
