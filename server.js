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

// Set up Handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// Database synchronization
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port', PORT));
});
