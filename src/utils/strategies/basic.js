const passport = require('passport');
const { BasicStrategy } = require('passport-http');

passport.use(new BasicStrategy((user, password, done) => {}));
