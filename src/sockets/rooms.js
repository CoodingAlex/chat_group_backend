const rooms = []

function createRoom(name) {
  return {
    name,
    users: [],
  }
}

function addRoom(name) {
  const existsRoom = rooms.filter((room) => room.name === name)
  if (existsRoom.length === 0) {
    const newRoom = createRoom(name)
    rooms.push(newRoom)
  }
}

function addUserToRoom(name, user) {
	const currentRoom = rooms.filter(room => room.name === name)[0]

	console.log(currentRoom.users)
  if (currentRoom.users?.indexOf(user) === -1) {
    rooms.map((room) => {
      if (room.name === name) {
        room.users.push(user)
      }
    })
  }
}

function getRoomUsers(name) {
  const filtered = rooms.filter((room) => room.name === name)
  return filtered[0]
}
module.exports = {
  addRoom,
  addUserToRoom,
  getRoomUsers,
}
