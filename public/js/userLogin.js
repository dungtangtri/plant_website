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
        let errorMessage = document.querySelector('#error-message');
        let successMessage = document.querySelector('#success-message');
        if (data.success) {
          errorMessage.textContent = ''; // clear error message
          successMessage.textContent = data.message;
          // Login successful, redirect to homepage
          setTimeout(() => {
            window.location.replace('/');
          }, 3000);

        } else {
          successMessage.textContent = ''
          errorMessage.textContent = data.message;
        }
      })
      .catch(error => {
        console.log(error);
      })
  });