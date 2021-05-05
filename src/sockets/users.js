const {
  addRoom,
  addUserToRoom,
  getRoomUsers,
  rooms,
  removeUserFromChats,
} = require('./rooms');
const jsonwetoken = require('jsonwebtoken');
const { decrypt } = require('../utils/auth/jwt');
const { jwt } = require('../config');
const users = [];

function createUser(id, name) {
  return {
    id,
    name,
    rooms: ['welcome'],
  };
}
async function decryptToken(token) {
  const user = await jsonwetoken.decode(token, jwt.secret);
  return user;
}
async function addUser(socket, token) {
  const user = await decryptToken(token);
  users.push(createUser(socket.id, user?.name));
}

function joinRoom(socket, room, description, name) {
  users.map((user) => {
    if (user.id === socket.id) {
      user.rooms.push(room);
    }
  });
  //Check if the room exists, if it, dont do nothing, else, create a new room
  addRoom(room, description);

  //Add the socket to the romm
  addUserToRoom(room, socket.id, name);
  //This function returns all the users in the room
  return getRoomUsers(room);
}

function getUserAvailableRooms(name) {
  const chats = rooms.filter((room) => !room.users.includes(name));
  return chats;
}
async function getUserByToken(token) {
  const payload = await decrypt(token);
  return payload;
}
function getUser(id) {
  const user = users.find((item) => item.id === id);
  return user;
}

function disconnectUser(id) {
  const user = users.find((user) => user.id === id);
  removeUserFromChats(user.name);
}
module.exports = {
  addUser,
  joinRoom,
  getUser,
  getUserByToken,
  getUserAvailableRooms,
  disconnectUser,
};
