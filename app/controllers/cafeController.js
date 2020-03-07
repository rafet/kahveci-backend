const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Cafe = require('./../models/Cafe');
const cafeEnums = require('./../enums/cafeEnums');

exports.find = async (req, res) => {
  try {
    const user = await Cafe.findOne({
      _id: req.params.id
    });
    if (!user) {
      res.status(404).json({
        message: cafeEnums.NOT_FOUND
      })
    }
    res.status(200).json({
      user: user
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const user = await Cafe.findOne({
      _id: req.params.id
    });
    if (!user) {
      res.status(404).json({
        message: cafeEnums.NOT_FOUND
      })
    }
    await Cafe.deleteOne({
      _id: req.params.id
    })
    res.status(201).json({
      message: cafeEnums.DELETED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

exports.update = async (req, res) => {
  try {
    const user = await Cafe.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      });
      if (!user) {
        res.status(404).json({
          message: cafeEnums.NOT_FOUND
        })
      }
      
      res.status(200).json({
        message: cafeEnums.UPDATED
      })
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
  