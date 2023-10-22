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
      type: Number,
    },
    mins: {
      type: Number,
    },
    phase: {
      type: Schema.Types.ObjectId,
      ref: "Phase",
    },
    comment: {
      type: String,
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      default: null,
    },
  },
  { collection: "time_entries" }
);

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
