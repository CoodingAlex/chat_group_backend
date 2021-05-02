const http = require('http')
const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const cookieParser = require('cookie-parser')
const sockets  = require('./sockets/server')
const app = express()
const server = http.createServer(app)
//config
const { db } = require('./config')
//mongo
const connectDB = require('./utils/database/connect')
const mongoUri = `mongodb+srv://${db.user}:${db.password}@${db.host}/${db.database}?retryWrites=true&w=majority`

connectDB(mongoUri)
//Routes
const authRouter = require('./routes/auth')
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true}))
app.use(cookieParser())


authRouter(app)
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


