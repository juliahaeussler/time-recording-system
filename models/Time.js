const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  project: {
    type: Schema.Types.ObjectId, 
    ref: 'Project'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  timespan: {
    type: Number,
    required: true,
  },
  servicePhase: {
    type: String,
    required: true,
  },
  comment: {
      type: String,
  },
  rate: {
    type: Number,
  }
});

const Time = mongoose.model('Time', timeSchema);

module.exports = Time;