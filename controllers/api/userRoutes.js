const router = require('express').Router();
const { User } = require('../../models');

// Endpoint to handle user registration
router.post('/', async (req, res) => {
  try {
    // Creating a new user with the data received in the request body
    const userData = await User.create(req.body);

    // Saving user session upon successful registration
    req.session.save(() => {
      req.session.logged_in = true; // Setting the logged_in flag to true
      req.session.user_id = userData.id; // Storing user id in session
      // req.status(200).json(userData); // Sending back 200 response with user data
    });

    // Logging user data to console for debugging purposes
    console.log(userData);
  } catch (err) {
    // Handling errors
    console.error(err);
    res.status(500).json(err); // Sending 500 response with error information
  }
});

// Endpoint to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find user by email in the database
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If user data is not found, send error response
    if (!userData) {
      res.status(500).json({ message: 'Email is incorrect!' });
      return;
    }

    // Check if the provided password matches the stored password for the user
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is not valid, send error response
    if (!validPassword) {
      res.status(500).json({ message: 'Password is incorrect!' });
      return;
    }

    // Save user session
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;

      // Send success response with user data
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Handle any errors that occur during login process
    console.error(err);
  }
});

module.exports = router; // Exporting the router for use in other files
