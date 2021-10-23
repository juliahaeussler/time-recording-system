const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { //hashed
    type: String,
    required: true,
  },
  name: {
      type: String,
      required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    //default: false,
    required: true,
  },
  isActive: {
    type: Boolean,
    //default: true,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;