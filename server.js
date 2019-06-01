require('./config');
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/', userRoutes)

mongoose.connect(process.env.URLDB, (err, resp) => {
  if (err) console.log(err)
  else {
    console.log('connected with mongo')
  }
})

app.listen(process.env.PORT, () => {
  console.log('works')
})
