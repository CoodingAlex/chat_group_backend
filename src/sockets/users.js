const { addRoom, addUserToRoom, getRoomUsers } = require('./rooms')
const users = []

function createUser(id, name) {
	return {
		id,
        name,
		rooms: ['welcome']
	}
}
function addUser(socket, name) {

	users.push(createUser(socket.id,name))	
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
