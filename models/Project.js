const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    number: {
      type: String,
    },
    date: {
      type: Date,
    },
    note: {
      type: String,
    },
  },
  { collection: "projects" }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
