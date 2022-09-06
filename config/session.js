const session = require('express-session');
const MongoStore = require('connect-mongo');
const dbClient = require('./database').getClient();

const SESSION_DURATION_IN_MILLISECONDS = 1000 * 60 * 60 * 12;

const sessionStore = MongoStore.create({
  client: dbClient,
});

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: SESSION_DURATION_IN_MILLISECONDS,
  },
});
