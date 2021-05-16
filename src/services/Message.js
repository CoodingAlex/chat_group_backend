const Message = require('../models/Message');
const boom = require('@hapi/boom');

class MessageService {
  async createMessage(message) {
    const newMessage = {
      chat: message.room,
      message: message.message,
      photo: message.photo,
      timestamp: message.timestamp,
      name: message.name,
    };

    const createdMessage = new Message(newMessage);
    const docs = await createdMessage.save();
    return docs;
  }

  async getAllMessagesRoom(chat) {
    const messages = await Message.find({ chat });
    return messages;
  }
}

module.exports = MessageService;
