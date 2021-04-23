const { addUser, joinRoom } = require('./users')
const { roomExists } = require('./rooms')

function sockets(io) {
  io.on('connection', (socket) => {
    //The default channel is the welcome channerl
    socket.join('welcome')
    io.to('welcome').emit('joinedRoom', { room: 'welcome', users: [] })
    io.to('welcome').emit('message', {
      room: 'welcome',
      message: 'Welcome to the chat new user',
    })
    addUser(socket)

    socket.on('joinRoom', (data) => {
      if (!roomExists(data.room)) {
        socket.broadcast.emit('newRoom', { room: data.room })
      }

      const { users } = joinRoom(socket, data.room)
      console.log(users)
      //Check if is a new room
      socket.join(data.room)
      io.to(data.room).emit('joinedRoom', { room: data.room, users })
    })

    socket.on('newRoom', (data) => {
      socket.join(data.room)
      const users = joinRoom(socket, data.room)
      socket.broadcast.emit('newRoom', { room: data.room, users })
    })

    socket.on('message', (data) => {
      io.to(data.room).emit('message', {
        room: data.room,
        message: data.message,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Full_Moon_Luc_Viatour.jpg/1015px-Full_Moon_Luc_Viatour.jpg",
        timeStamp: new Date().toDateString(),
        name: "Alex"
      })
    })
  })
}

module.exports = sockets
