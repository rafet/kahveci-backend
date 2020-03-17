const mongoose = require('mongoose');
const validator = require('validator');

const caffeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: [{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Product'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Order', caffeSchema);
