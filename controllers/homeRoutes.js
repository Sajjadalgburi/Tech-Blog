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

    console.log(
      `user with id ${req.session.user_id} and name ${req.session.user_first_name} is logged in !`,
    );

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

// GET route for a specific comment
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    // Retrieve post data along with associated user and comment information
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['first_name'] }, // Include user's first name
        { model: Comment, attributes: ['text'] }, // Include comment text
      ],
    });

    if (!postData) {
      // If post data is not found, return 404 status with message
      return res.status(404).json({ message: 'Post not found' });
    }

    // Extracting text of each comment for the post
    const post = postData.get({ plain: true });
    post.commentTexts = post.comments.map((comment) => comment.text);

    console.log(post); // Log the post object to console for debugging

    // Render the comment view with post data and logged_in status
    res.render('comment', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err); // Log any errors to console
    res.status(500).json({ message: 'Internal server error' }); // Return 500 status for internal server error
  }
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
