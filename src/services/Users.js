const User = require('../models/User');
const { jwt } = require('../config');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jsonwebtoken = require('jsonwebtoken');
class UserService {
  async createUser(user) {
    const existUser = await this.findOne(user.name);
    if (existUser) {
      throw boom.unauthorized('Username already exists');
    }
    const newUser = {
      name: user.name,
      photo: user.photo,
      password: await bcrypt.hash(user.password, 5),
    };
    const createdUser = new User(newUser);
    const docs = await createdUser.save();
    delete newUser.password;
    const token = await jsonwebtoken.sign(newUser, jwt.secret);
    return token;
  }

  async findOne(name) {
    const user = await User.findOne({
      name,
    }).exec();
    return user;
  }
}

module.exports = UserService;
