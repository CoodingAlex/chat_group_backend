const Chat = require('../models/Chat');

class ChatService {
  async getAllChats() {
    try {
      const chats = await Chat.find();
      return chats;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createChat(name, description) {
    //Check if chat exists
    try {
      const existsChat = await Chat.findOne({ name });
      if (!existsChat) {
        const chat = new Chat({
          name,
          description,
        });
        const createdChat = chat.save();
        return createdChat;
      }
    } catch (err) {}
  }
}

module.exports = ChatService;
