const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0
  },
  wallet: {
    type: Number,
    default: 0
  },
  address: {
    type: String,
  },
  role: {
    type: Number,
  }
});

module.exports = mongoose.model('User', userSchema);
