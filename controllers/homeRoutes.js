const router = require('express').Router();
const withAuth = require('../utils/auth');

// GET method for all posts made
router.get('/', async (req, res) => {
  res.render('homepage');
});

// GET method for user dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  res.render('dashboard');
});

// GET method for login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// GET method for Sign up route
router.get('/signUp', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signUp');
});

module.exports = router;
