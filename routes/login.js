const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

router.post('/login', (req, res) => {
  let body = req.body;

  if (!body.password || !body.email) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Please provide an email and password',
      },
    });
  }

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
      });
    } else {
      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'User not found',
          },
        });
      } else {
        if (!bcrypt.compareSync(body.password, userDB.password)) {
          return res.status(400).json({
            ok: false,
            err: {
              message: 'Password not match',
            },
          });
        } else {
          let token = jwt.sign(
            {
              userDB,
            },
            process.env.SEED,
            { expiresIn: process.env.TOKEN_EXPIRY },
          );

          res.json({
            ok: true,
            token,
          });
        }
      }
    }
  });
});

module.exports = router;
