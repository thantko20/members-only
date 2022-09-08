const { body, validationResult } = require('express-validator');
const passport = require('../config/passport');
const { genPassword } = require('../lib/passwordUtils');
const User = require('../models/user');
const Message = require('../models/message');

// GET /
// Get the messages
exports.index = async (req, res, next) => {
  try {
    const messages = await Message.find().populate('author').sort({ date: -1 });

    res.render('index', { messages, title: 'Messages' });
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

// GET become a member
exports.become_a_member_get = (req, res) => {
  res.render('become_a_member', {
    errorMessages: {},
    title: 'Become a member',
  });
};

// POST Become a member
exports.become_a_member_post = [
  body('memberCode', 'Member code is required!').custom((value, { req }) => {
    if (!req.user) {
      throw new Error('Please login first to become a member.');
    }
    if (value !== process.env.MEMBER_CODE) {
      throw new Error('Wrong member code!');
    }
    return true;
  }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = {};
        errors.array().forEach((err) => (errorMessages[err.param] = err.msg));

        res.render('become_a_member', {
          errorMessages,
        });
        return;
      }

      const userId = req.user._id;

      await User.findByIdAndUpdate(userId, { membership: true });

      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
];

// GET Create a message
exports.create_message_get = (req, res) => {
  res.render('create_message', {
    errorMessages: {},
    title: 'Create a Message',
  });
};

// POST Create a message
exports.create_message_post = [
  body('title', 'Title is required')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Title should have minimum of 2 and maximum of 50 characters.')
    .escape(),
  body('description', 'Description is required')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Description should have at least 4 characters.')
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = {};
        errors.array().forEach((err) => {
          errorMessages[err.param] = err.msg;
        });

        res.render('create_message', {
          title: 'Create a Message',
          errorMessages,
        });
        return;
      }

      if (!req.user && !req.user.membership) {
        res.redirect('/create_message');
        return;
      }

      const newMessage = new Message({
        title: req.body.title,
        description: req.body.description,
        author: req.user._id,
      });

      await newMessage.save();
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
];

// GET Become an admin
exports.become_admin_get = (req, res) => {
  res.render('become_admin', { errorMessages: {}, title: 'Become an admin' });
};

// POST Become an admin
exports.become_admin_post = [
  body('adminCode', 'Admin code is required!').custom((value, { req }) => {
    if (!req.user) {
      throw new Error('Please login first to become an admin.');
    }
    if (value !== process.env.ADMIN_CODE) {
      throw new Error('Wrong admin code!');
    }
    return true;
  }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = {};
        errors.array().forEach((err) => (errorMessages[err.param] = err.msg));

        res.render('become_admin', {
          errorMessages,
        });
        return;
      }

      const userId = req.user._id;

      await User.findByIdAndUpdate(userId, { admin: true });

      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
];
