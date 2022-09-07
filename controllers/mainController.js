const { body, validationResult } = require('express-validator');
const passport = require('../config/passport');
const { genPassword } = require('../lib/passwordUtils');
const User = require('../models/user');
const Message = require('../models/message');

// GET /
// Get the messages
exports.index = async (req, res, next) => {
  try {
    const messages = await Message.find().populate('author');

    res.render('index', { messages });
  } catch (err) {
    next(err);
  }
};

// GET /sign-up
exports.sign_up_get = (req, res) => {
  res.render('sign-up', {
    title: 'Sign Up',
    errorMessages: {},
  });
};

// POST /sign-up
exports.sign_up_post = [
  body('username', 'Must provide a username')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('The characters length should be between 3 and 21')
    .isAlphanumeric()
    .withMessage('Must be a combination of letters and numbers')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });

      if (user) return Promise.reject('Username already in use');
    })
    .escape(),
  body('password', 'Must provide a password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long.')
    .escape(),
  body('confirmPassword', 'Must provide a password').custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password.');
      }

      return true;
    }
  ),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const errorMessages = {};

      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
          errorMessages[err.param] = err.msg;
        });

        res.render('sign-up', {
          title: 'Sign Up',
          errorMessages,
        });
        return;
      }

      const { username, password } = req.body;

      const hashPassword = await genPassword(password);

      const newUser = new User({
        username: username,
        password: hashPassword,
      });

      await newUser.save();

      res.redirect('/login');
    } catch (err) {
      next(err);
    }
  },
];

// GET Login
exports.login_get = (req, res) => {
  res.render('login', {
    title: 'Login',
    errorMessages: {},
  });
};

// POST Login
exports.login_post = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
});

// POST Log out
exports.log_out_post = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};
