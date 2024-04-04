const logoutButton = document.getElementById('logout');

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