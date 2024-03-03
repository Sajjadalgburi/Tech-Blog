const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

// GET method for retrieving all posts along with associated user information and comments
router.get('/', async (req, res) => {
  try {
    // Retrieve all post data along with associated user and comment information
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['first_name'] }, // Include user's first name
        { model: Comment, attributes: ['text'] }, // Include comment text
      ],
    });

    // Map post data to extract necessary information
    const posts = postData.map((data) => {
      const post = data.get({ plain: true });
      // Extracting text of each comment for the post
      post.commentTexts = post.comments.map((comment) => comment.text);
      return post;
    });

    // Log the retrieved posts
    console.log(posts);

    // Render homepage with retrieved posts and login status
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json(err);
  }
});

// GET method for user dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  res.render('dashboard', {
    logged_in: req.session.logged_in,
  });
});

// GET method for login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/').reload();
    return;
  }

  res.render('login');
});

// GET method for Sign up route
router.get('/signUp', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/').reload();
    return;
  }

  res.render('signUp');
});

// GET method for logout route
router.get('/logout', (req, res) => {
  res.redirect('/').reload();
});

module.exports = router;
