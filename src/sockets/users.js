const { addRoom, addUserToRoom, getRoomUsers } = require('./rooms')
const users = []

function createUser(id) {
	return {
		id,
		rooms: ['welcome']
	} 
}
function addUser(socket) {
	users.push(createUser(socket.id))	
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
module.exports = {
	addUser,
	joinRoom
}
