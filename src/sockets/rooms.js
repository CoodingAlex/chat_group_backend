const rooms = [];

function createRoom(name, description) {
  return {
    name,
    description,
    users: [],
  };
}
function roomExists(name) {
  const existsRoom = rooms.filter((room) => room.name === name);
  if (existsRoom.length === 0) {
    return false;
  }
  return true;
}
function addRoom(name, description) {
  const existsRoom = rooms.filter((room) => room.name === name);
  if (existsRoom.length === 0) {
    const newRoom = createRoom(name, description);
    rooms.push(newRoom);
  }
}

function addUserToRoom(name, user, username, photo) {
  const currentRoom = rooms.filter((room) => room.name === name)[0];

  if (currentRoom.users?.indexOf(user) === -1) {
    rooms.map((room) => {
      if (room.name === name) {
        room.users.push({ username, photo });
      }
    });
  }
}

function getRoomUsers(name) {
  const filtered = rooms.filter((room) => room.name === name);
  return filtered[0];
}

function removeUserFromChats(user) {
  rooms.map((room) => {
    const pos = room.users.indexOf(user);
    room.users.splice(pos, 1);
  });
}

function getRoom(name) {
  return rooms.find((room) => room.name === name);
}

module.exports = {
  addRoom,
  addUserToRoom,
  getRoomUsers,
  rooms,
  roomExists,
  rooms,
  removeUserFromChats,
  getRoom,
};
