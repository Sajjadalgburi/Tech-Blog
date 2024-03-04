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
      req.session.user_first_name = userData.first_name; // Storing user first name in session
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
      req.session.user_first_name = userData.first_name;

      // Send success response with user data
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Handle any errors that occur during login process
    console.error(err);
  }
});

// Route for handling logout requests
router.post('/logout', (req, res) => {
  try {
    // Check if the user is logged in
    if (req.session.logged_in) {
      // Destroy the session and log the user out
      req.session.destroy(() => {
        // Respond with a 204 status (No Content) to indicate successful logout
        res.status(204).end();
      });
    } else {
      // If the user is not logged in, respond with a 404 status (Not Found)
      res.status(404).end();
    }
  } catch (err) {
    // If an error occurs during the logout process, log the error
    console.error(err);
  }
});

module.exports = router; // Exporting the router for use in other files
