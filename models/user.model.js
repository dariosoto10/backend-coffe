const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')

let Schema = mongoose.Schema

let roleValids = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not a valid role'
}

let validateLengthMin = (value) => { return value.length > 4 }
// let validateLengthMax = (value) => { return value.length <= 20 }

let userSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'name is required'],
    validate: [validateLengthMin, 'should be grater than 5']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    validate: [validator.isEmail, 'Invalid Email Address']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'ROLE',
    enum: roleValids
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: true
  }
})

userSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  delete userObject.password

  return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' })

module.exports = mongoose.model('user', userSchema)
