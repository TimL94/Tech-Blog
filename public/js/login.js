

//handles the users logging in
const loginHandler = async (event) => {
    event.preventDefault();


    //retrieves uer input from the email and password fields and assigns a variable
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    //makes sure that an email and password exist before continuing
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        //if a 200 response is revieved than the user is logged in and redireceted to the homepaage
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Login attempt failed.');
        }
    }}

    // craeates an event listener to trigger the loginhandler
    const login = document.getElementById('login');
    
    login.addEventListener('submit', loginHandler);
    

