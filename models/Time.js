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
  timespanHours: {
    type: Number,
    required: true,
    max: 24,
  },
  timespanMins: {
    type: Number,
    required: true,
    enum: [00, 15, 30, 45],
    default: 00,
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
  },
  isDeducted: {
    type: Boolean,
    default: false,
  },
});

const Time = mongoose.model('Time', timeSchema);

module.exports = Time;