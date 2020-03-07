const mongoose = require('mongoose');
const validator = require('validator');

const caffeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  address: {
    type: String,
  }
});

module.exports = mongoose.model('Caffe', caffeSchema);
