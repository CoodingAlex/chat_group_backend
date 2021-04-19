const { addUser, joinRoom }  = require('./users')

function sockets(io) {
	io.on('connection', socket => {
		//The default channel is the welcome channerl
		socket.join('welcome')
		io.to('welcome').emit('joinedRoom', {room: 'welcome', users:[]})
		io.to('welcome').emit('message', { room: 'welcome', message: 'Welcome to the chat new user' })
		addUser(socket)

		socket.on('joinRoom', data => {
			const { users } = joinRoom(socket, data.room)	
			socket.join(data.room)
			io.to(data.room).emit("joinedRoom", {room: data.room, users})
		})

		socket.on('message', data => {
			io.to(data.room).emit('message', {room: data.room, message: data.message})
		})
	})
}

module.exports = sockets
