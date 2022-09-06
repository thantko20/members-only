require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();

const db = require('./config/database');
const passport = require('./config/passport');

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
