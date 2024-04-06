const logoutButton = document.getElementById('logout');

    //logs the user out and returns the user to the homepage (which will actually redirect the user to the login page based on logic elsewhere)
    const logout = async () => {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            console.log(response);
            alert('Failed to logout');
        }
    };

    logoutButton.addEventListener('click', logout);