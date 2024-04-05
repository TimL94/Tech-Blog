const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;


    if (username && email && password) {
        const response = await fetch ('/api/users', {
            method:'POST',
            body: JSON.stringify({ username, email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Signup attempt failed.')
        }
    }
};

const signup = document.getElementById('signup');
signup.addEventListener('submit', signupHandler);