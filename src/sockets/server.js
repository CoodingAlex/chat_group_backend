const {
  addUser,
  joinRoom,
  getUser,
  getUserByToken,
  getUserAvailableRooms,
  disconnectUser,
} = require('./users');

const { roomExists, getRoom } = require('./rooms');
function sockets(io) {
  io.on('connection', (socket) => {
    //The default channel is the welcome channerl
    socket.join('welcome');
    io.to('welcome').emit('joinedRoom', {
      room: 'welcome',
      users: [],
      description: 'Welcome to chat group!',
    });
    io.to('welcome').emit('message', {
      room: 'welcome',
      message: 'Welcome to the chat new user',
      name: 'Pepe el Gallo',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Full_Moon_Luc_Viatour.jpg/1015px-Full_Moon_Luc_Viatour.jpg',
      timeStamp: new Date().toDateString(),
    });
    addUser(socket, socket.handshake.query.token);
    socket.on('availableChats', async (data) => {
      const user = await getUserByToken(data.token);
      const chats = getUserAvailableRooms(user.name);

      io.to(socket.id).emit('availableChats', { chats });
    });

    socket.on('joinRoom', async (data) => {
      const user = await getUserByToken(data.token);
      if (!roomExists(data.room)) {
        socket.broadcast.emit('newRoom', { room: data.room });
      }
      io.to(data.room).emit('message', {
        room: data.room,
        message: `Welcome to the chat ${data.room} ${user.name}`,
        name: 'Pepe el Gallo',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Full_Moon_Luc_Viatour.jpg/1015px-Full_Moon_Luc_Viatour.jpg',
        timeStamp: new Date().toDateString(),
      });

      const { users } = joinRoom(
        socket,
        data.room,
        data.description,
        user.name,
        data.photo // <----Cambiar esto al un token
      );

      socket.join(data.room);

      //if is a new room, description come with thw data if not, we get the description
      const room = getRoom(data.room);
      io.to(data.room).emit('joinedRoom', {
        room: data.room,
        users,
        description: data.description || room.description,
      });
    });

    socket.on('newRoom', (data) => {
      socket.join(data.room);
      const users = joinRoom(socket, data.room, data.description);

      socket.broadcast.emit('newRoom', { room: data.room, users });
    });

    socket.on('message', async (data) => {
      const user = await getUserByToken(data.token);
      io.to(data.room).emit('message', {
        room: data.room,
        message: data.message,
        photo: user.photo,
        timeStamp: new Date().toDateString(),
        name: user.name,
      });
    });

    socket.on('disconnect', () => {
      disconnectUser(socket.id);
    });
  });
}

module.exports = sockets;
