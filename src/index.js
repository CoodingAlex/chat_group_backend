const http = require('http')
const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const sockets  = require('./sockets/server')

const app = express()
const server = http.createServer(app)
app.use(cors())

const io = socketio(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
})

sockets(io)
server.listen(8080, () => {
	console.log('server listening on port 8080')
})


