const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const userEnums = require('./../enums/userEnums');

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })

    if (user) {
      return res.status(409).json({
        message: userEnums.EMAIL_EXIST,
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        score: 0,
        wallet: 0,
        address: req.body.address,
        role: 0
      });
      await newUser.save()
      res.status(201).json({
        message: userEnums.CREATED,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })
    if (!user) {
      return res.status(401).json({
        message: userEnums.AUTH_NO_EXIST,
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: userEnums.AUTH_FAILED,
        });
      }

      if (result) {
        const expires = '10y';
        const token = jwt.sign({
          email: user.email,
          userId: user._id,
        },
          process.env.JWT_KEY, {
            expiresIn: expires,
          },
        );
        return res.status(200).json({
          message: userEnums.AUTH_SUCCESSFUL,
          token,
          expiresIn: expires,
          userId: user._id,
        });
      }
      res.status(401).json({
        message: userEnums.AUTH_FAILED,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.find = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id
    });
    if (!user) {
      res.status(404).json({
        message: userEnums.NOT_FOUND
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

exports.findMe = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.userData.userId
    }, { password: 0 });
    if (!user) {
      res.status(404).json({
        message: userEnums.NOT_FOUND
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
    const user = await User.findOne({
      _id: req.params.id
    });
    if (!user) {
      res.status(404).json({
        message: userEnums.NOT_FOUND
      })
    }
    await User.deleteOne({
      _id: req.params.id
    })
    res.status(201).json({
      message: userEnums.DELETED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

exports.update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      });
    if (!user) {
      res.status(404).json({
        message: userEnums.NOT_FOUND
      })
    }

    res.status(200).json({
      message: userEnums.UPDATED
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
