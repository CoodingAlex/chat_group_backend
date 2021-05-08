const { Router } = require('express');
const passport = require('passport');
const UserService = require('../services/Users');
const userService = new UserService();
const { encrypt } = require('../utils/auth/jwt');

//strategies
require('../utils/strategies/basic');
require('../utils/strategies/jwt');

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
      const token = await userService.createUser(user);
      user.token = token;
      delete user.password;
      if (req.cookies.user) {
        res.clearCookie('user');
      }
      res.cookie('user', token, { httpOnly: false });
      res.status(200).json({ message: 'User Registered', user });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/sign-in',
    passport.authenticate('basic', { session: false }),
    async (req, res, next) => {
      try {
        console.log(req.user);
        const token = await encrypt(req.user);
        console.log(token);
        res.cookie('user', token, { httpOnly: false });
        res.status(200).json({ ...req.user, token });
      } catch (err) {
        next(err);
      }
    }
  );
  router.post('/sign-out', (req, res, next) => {
    res.clearCookie('user');
    res.status(200).json({ message: 'signed out' });
  });
  router.post(
    '/verify-token',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      res.json(req.user);
    }
  );
};
