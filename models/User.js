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
  isAdmin: {
    type: boolean,
    default: false,
    required: true,
  },
  rate: {
    type: number,
    required: true,
  },
  isActive: {
    type: boolean,
    default: true,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;