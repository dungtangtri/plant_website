const form = document.querySelector('#login-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = form.elements.username.value;
    const password = form.elements.password.value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const successMessage = document.querySelector('#success-message');
          successMessage.textContent = data.message;
          // Login successful, redirect to homepage
          setTimeout(() => {
            window.location.replace('/');
          }, 3000);

        } else {
          // Login failed, display error message
          const errorMessage = document.querySelector('#error-message');
          errorMessage.textContent = data.message;
        }
      })
      .catch(error => {
        console.log(error);
      })
  });