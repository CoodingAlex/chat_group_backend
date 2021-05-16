const { Schema, model } = require('mongoose');

const Chat = new Schema({
  name: Schema.Types.String,
  description: Schema.Types.String,
});

module.exports = model('Chat', Chat);
