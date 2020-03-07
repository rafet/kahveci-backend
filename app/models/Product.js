const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    hasScore: {
        type: Boolean,
        required: true,
        default: false
    },

});

module.exports = mongoose.model('Product', productSchema);
