const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const { isValidPassword } = require('../lib/passwordUtils');

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) return done(null, false, { message: 'Invalid Username.' });

    const isValid = await isValidPassword(password, user.password);

    if (!isValid) return done(null, false, { message: 'Invalid Password.' });

    done(null, user);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
