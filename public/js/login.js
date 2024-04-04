const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();


    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Login attempt failed.');
        }
    }}

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
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');
    login.addEventListener('submit', loginHandler);
    signup.addEventListener('submit', signupHandler);

