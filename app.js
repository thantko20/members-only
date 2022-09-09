require('dotenv').config();
const path = require('path');
const express = require('express');

const setUser = require('./middlewares/setUser');

const app = express();

const PORT = process.env.PORT || 3000;

const db = require('./config/database');
const session = require('./config/session');
const passport = require('./config/passport');

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(setUser);

app.use(indexRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
