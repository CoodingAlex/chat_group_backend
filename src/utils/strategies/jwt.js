const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const UserService = require('../../services/Users');
const userService = new UserService();
const { jwt } = require('../../config');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt.secret,
};
passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await userService.findOne(payload.name);
      if (!user) {
        return done(null, false);
      }
      const { name, _id, photo } = user
      return done(null, { name, _id, photo })
    } catch(err) {
        return done(err, false)
    }
  })
);
