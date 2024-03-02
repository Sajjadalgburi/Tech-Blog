// Middleware function to check if user is authenticated
const withAuth = (req, res, next) => {
  // Check if user is not logged in
  if (!req.session.logged_in) {
    // Redirect user to login page if not logged in
    res.redirect('/login');
  } else {
    // Continue to the next middleware if user is logged in
    next();
  }
};

// Export the middleware function
module.exports = withAuth;
