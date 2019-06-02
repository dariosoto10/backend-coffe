const express = require('express')
const userRoutes = require('./user')
const loginRoutes = require('./login')
const app = express()

app.use(userRoutes, loginRoutes)

module.exports = app
