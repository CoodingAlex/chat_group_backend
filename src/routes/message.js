const { Router } = require('express');
const MessageService = require('../services/Message');
const messageService = new MessageService();

module.exports = function messagesRouter(app) {
  const router = Router();
  app.use('/messages', router);

  router.get('/room/:room', async (req, res, next) => {
    const { room } = req.params;
    try {
      const messages = await messageService.getAllMessagesRoom(room);
      res.status(200).json({ message: 'messages get', data: messages });
    } catch (err) {
      next(err);
    }
  });
};
