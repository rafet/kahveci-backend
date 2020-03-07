const mongoose = require('mongoose');
const validator = require('validator');

const qrSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    date:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Qr', qrSchema);
