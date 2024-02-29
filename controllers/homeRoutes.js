const router = require('express').Router();

// GET method for all posts made
router.get('/', async (req, res) => {
  res.render('homepage');
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

module.exports = router;
