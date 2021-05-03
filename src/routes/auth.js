const { Router } = require('express');
const UserService = require('../services/Users');
const userService = new UserService();

module.exports = function authRouter(app) {
  const router = Router();
  app.use('/auth', router);

  router.post('/register', async (req, res, next) => {
    const user = {
      name: req.body.name,
      photo: req.body.photo,
      password: req.body.password,
    };
    try {
        const token = await userService.createUser(user)
        user.token = token
        delete user.password
      if (req.cookies.user) {
        res.clearCookie('user');
      }
      res.cookie('user',token , { httpOnly: false });
        res.status(200).json({ message: 'User Registered', user });
    } catch(err) {
        next(err)
    }
  });

  router.post('/sign-in', (req, res, next) => {});
};
