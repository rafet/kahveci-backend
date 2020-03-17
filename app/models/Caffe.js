const mongoose = require('mongoose');
const validator = require('validator');

const caffeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  district_name: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  }
});

module.exports = mongoose.model('Caffe', caffeSchema);
