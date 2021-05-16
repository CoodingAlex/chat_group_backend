const { Schema, model } = require('mongoose');

const Message = new Schema({
  chat: Schema.Types.String,
  message: Schema.Types.String,
  photo: Schema.Types.String,
  timestamp: Schema.Types.Date,
  name: Schema.Types.String,
});

module.exports = model('Message', Message);
