const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3001;
const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
const maxAgeInDays = 3; // Number of days you want the session to last

const app = express();

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: oneDayInMilliseconds * maxAgeInDays,
    httpOnly: true,
    secure: false, // Change to true if serving over HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
