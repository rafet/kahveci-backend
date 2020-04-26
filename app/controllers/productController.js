const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Product = require('./../models/Product');
const productEnums = require('./../enums/productEnums');

exports.find = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id
        });
        if (!product) {
            res.status(404).json({
                message: productEnums.NOT_FOUND
            })
        }
        res.status(200).json({
            product: product
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
}
exports.list = async (req, res) => {
    try {
        const products = await Product.find({}).sort({_id:-1});
       
        res.status(200).json({
            products
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
}

exports.create = async (req, res) => {
    try {
        const newProdcut = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            photo: req.body.photo,
            hasScore: req.body.hasScore
        });
        await newProdcut.save()
        res.status(200).json({
            message: productEnums.CREATED,
            product:newProdcut
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id
        });
        if (!product) {
            res.status(404).json({
                message: productEnums.NOT_FOUND
            })
        }
        await Product.deleteOne({
            _id: req.params.id
        })
        res.status(201).json({
            message: productEnums.DELETED
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
}

exports.update = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { ...req.body }
            });
        if (!product) {
            res.status(404).json({
                message: productEnums.NOT_FOUND
            })
        }

        res.status(200).json({
            message: productEnums.UPDATED
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
}
