const logInFromHandler = async (e) => {
  e.preventDefault();

  const first_name = document.querySelector('#first-name').value.trim();
  const last_name = document.querySelector('#last-name').value.trim();
  const password = document.querySelector('#password').value.trim();
  const email = document.querySelector('#email').value.trim();

  if (first_name && last_name && password && email) {
    const response = await fetch('api/users/', {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, password, email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Falied to sign up!');
    }
  } else {
    alert('Everything must be filled out!');
  }
};

console.log('hiiiiii');

document
  .querySelector('#submit-button1')
  .addEventListener('click', logInFromHandler);
