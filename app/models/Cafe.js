const mongoose = require('mongoose');
const validator = require('validator');

const cafeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  address: {
    type: String,
  }
});

module.exports = mongoose.model('Cafe', cafeSchema);
