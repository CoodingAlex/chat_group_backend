const rooms = []

function createRoom(name) {
  return {
    name,
    users: [],
  }
}
function roomExists(name) {
  
  const existsRoom = rooms.filter((room) => room.name === name)
  if (existsRoom.length === 0) {
    return false
  }
  return true
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
  rooms,
  roomExists
}
