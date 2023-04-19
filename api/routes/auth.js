const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(12);
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fnr3u24buiabfasiufb4ui3fbaisubf';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json({
      user,
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user) {
    const passwordOk = bcrypt.compareSync(password, user.password);
    if (passwordOk) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie('token', token).json(user);
        }
      );
    } else {
      res.status(422).json({ message: 'Password not ok' });
    }
  } else {
    res.status(404).json({
      message: 'Not found',
    });
  }
});

module.exports = router;
