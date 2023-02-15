const form = document.querySelector('#login-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const csrf = form.elements._csrf.value

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password,csrf }),
    })
      .then((response) => response.json())
      .then((data) => {
        let errorMessage = document.querySelector('#error-message');
        const successMessage = document.querySelector('#success-message');
        if (data.success) {
          errorMessage = '';
          successMessage.textContent = data.message;
          // Login successful, redirect to homepage
          setTimeout(() => {
            window.location.replace('/');
          }, 3000);

        } else {
          // Login failed, display error message
         
          errorMessage.textContent = data.message;
        }
      })
      .catch(error => {
        console.log(error);
      })
  });