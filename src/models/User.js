const { Schema, model } = require('mongoose')

const User = new Schema({
    name: Schema.Types.String,
    photo: Schema.Types.String,
    password: Schema.Types.String
})

module.exports = model('User', User)