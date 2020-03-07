const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Qr = require('./../models/Qr');
const qrEnums = require('./../enums/qrEnums');

exports.find = async (req, res) => {
  try {
    const qr = await Qr.findOne({
      _id: req.params.id
    });
    if (!qr) {
      res.status(404).json({
        message: qrEnums.NOT_FOUND
      })
    }
    res.status(200).json({
      qr: qr
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
exports.create = async (req, res) => {
  try {
    const newOrder = new Qr({
      _id: new mongoose.Types.ObjectId(),
      userId: req.body.userId,
      productId: req.body.productId,
      date: Date.now()
    })
    await newOrder.save()
    res.status(201).json({
      message: qrEnums.CREATED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const qr = await Qr.findOne({
      _id: req.params.id
    });
    if (!qr) {
      res.status(404).json({
        message: qrEnums.NOT_FOUND
      })
    }
    await Qr.deleteOne({
      _id: req.params.id
    })
    res.status(201).json({
      message: qrEnums.DELETED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

exports.update = async (req, res) => {
  try {
    const qr = await Qr.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      });
    if (!qr) {
      res.status(404).json({
        message: qrEnums.NOT_FOUND
      })
    }

    res.status(200).json({
      message: qrEnums.UPDATED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
