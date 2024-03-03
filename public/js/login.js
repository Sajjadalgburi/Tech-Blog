// Function to handle form submission
const logInFormHandler = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get user input values
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  // Check if email and password are provided
  if (email && password) {
    // Send login request to the server
    const response = await fetch('api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }), // Send user credentials in JSON format
      headers: { 'Content-Type': 'application/json' }, // Set request header
    });

    // Check if response is successful
    if (response.ok) {
      document.location.replace('/'); // Redirect to homepage if login is successful
    } else {
      alert('Failed to log in'); // Alert user if login fails
    }
  }
};

// Event listener for form submission
document
  .querySelector('#submit-button')
  .addEventListener('click', logInFormHandler);
