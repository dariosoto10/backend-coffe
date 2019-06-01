const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const router = express.Router()
const _ = require('lodash')

router.get('/user', (req, res) => {
  let from = req.query.from || 0
  from = Number(from)

  let limit = req.query.limit || 15
  limit = Number(limit)

  User.find({ status: true }, 'name email role status google img')
    .skip(from)
    .limit(limit)
    .exec((err, UsersDB) => {
      if (err) {
        res.status(400).json({
          ok: false,
          err
        })
      } else {
        User.count({ status: true }, (err, count) => {
          if (err) {
            res.status(400).json({
              ok: false,
              err
            })
          } else {
            res.json({
              ok: true,
              users: UsersDB,
              count
            })
          }
        })
      }
    })
})

router.post('/user', (req, res) => {
  let body = req.body

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

  user.save((err, userDB) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err
      })
    } else {
      res.json({
        ok: true,
        user: userDB
      })
    }
  })
})

router.put('/user/:id', (req, res) => {
  let body = _.pick(req.body, ['name', 'email', 'img', 'role'])
  let id = req.params.id

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDB) => {
      if (err) {
        res.status(400).json({
          ok: false,
          err
        })
      } else {
        res.json({
          ok: true,
          user: userDB
        })
      }
    }
  )
})

router.delete('/user/:id', (req, res) => {
  let id = req.params.id

  User.findByIdAndRemove(id, (err, userRemoved) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err
      })
    } else {
      if (!userRemoved) {
        res.status(400).json({
          ok: false,
          err: 'User nof found'
        })
      } else {
        res.json({
          ok: true,
          user: userRemoved
        })
      }
    }
  })
})

router.get('/omg', (req, res) => {
  res.json({
    omg: true
  })
})

module.exports = router
