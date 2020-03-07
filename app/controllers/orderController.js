const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Order = require('./../models/Order');
const orderEnums = require('./../enums/orderEnums');

exports.find = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id
    });
    if (!order) {
      res.status(404).json({
        message: orderEnums.NOT_FOUND
      })
    }
    res.status(200).json({
      order: order
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
exports.create = async (req, res) => {
  try {
    const newOrder = new Order({
      _id: new mongoose.Types.ObjectId(),
      products: req.body.products,
      userId: req.body.userId,
      caffeId: req.body.caffeId,
      date: Date.now()
    })
    await newOrder.save()
    res.status(201).json({
      message: orderEnums.CREATED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id
    });
    if (!order) {
      res.status(404).json({
        message: orderEnums.NOT_FOUND
      })
    }
    await Order.deleteOne({
      _id: req.params.id
    })
    res.status(201).json({
      message: orderEnums.DELETED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

exports.update = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      });
    if (!order) {
      res.status(404).json({
        message: orderEnums.NOT_FOUND
      })
    }

    res.status(200).json({
      message: orderEnums.UPDATED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
