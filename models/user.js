const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // Pre validate data before saving it

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator) // Save plugin

module.exports = mongoose.model('User', userSchema)