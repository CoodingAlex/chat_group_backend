const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const bcrypt = require('bcrypt');
const UserService = require('../../services/Users');
const userService = new UserService();
passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const user = await userService.findOne(username);
      if (!user) {
        return done(null, false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false);
      }
      const { name, photo, _id } = user;
      done(null, { name, photo, _id });
    } catch (err) {
      return done(err);
    }
  })
);
