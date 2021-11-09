const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  comment: {
      type: String,
  },
  projectCode: {
    type: String,
    unique: true,
    required: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;