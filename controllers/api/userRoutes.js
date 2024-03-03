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
      // req.session.user_id = userData.id; // Storing user id in session
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

module.exports = router; // Exporting the router for use in other files
