const form = document.querySelector('#register-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    let errorMessage = document.querySelector('#error-message');
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Password do not match';
        return;
    }
    errorMessage.textContent = '';

    fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        }
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
            };
        })
        .catch(error => {
            console.log(error);
        })
});