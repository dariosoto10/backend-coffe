require('./config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const Routes = require('./routes')
const chalk = require('chalk')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/', Routes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`${chalk.green('[backend-coffee]')} server listening on port ${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log(`${chalk.red('[backend-coffee]')} something went wrong! ${err}`)
  })
