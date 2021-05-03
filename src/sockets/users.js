const { addRoom, addUserToRoom, getRoomUsers } = require('./rooms')
const jsonwetoken = require('jsonwebtoken')
const { jwt } = require('../config')
const users = []

function createUser(id, name) {
	return {
		id,
        name,
		rooms: ['welcome']
	}
}
async function decryptToken(token) {
    console.log(token);
    const user = await jsonwetoken.decode(token, jwt.secret)
    console.log(user);
    return user
}
async function addUser(socket, token) {
    const user = await decryptToken(token )
	users.push(createUser(socket.id,user?.name))	
}

function joinRoom(socket, room) {
	users.map(user => {
		if(user.id === socket.id){
			user.rooms.push(room)
		}
	})
	//Check if the room exists, if it, dont do nothing, else, create a new room
	addRoom(room)
	
	//Add the socket to the romm
	addUserToRoom(room, socket.id)
	//This function returns all the users in the room
	return getRoomUsers(room)	
}

function getUser(id) {
    const user = users.find(item => item.id === id)
    return user
}
module.exports = {
	addUser,
	joinRoom,
    getUser
}
