const updatePostHandler = document.getElementById('update-post');

// creates the event listener for updating a post and makes the fetch call to routes
const updatePost = async (event) => {
    event.preventDefault();

    const title = document.getElementById('new-title').value.trim();
    const content = document.getElementById('new-content').value.trim();

    console.log(`\n${title}\n\n${content}`)

    if ( title && content) {
        const response = await fetch('/api/posts/updatepost', {
            method: 'PUT',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            //document.location.replace('/');
        } else {
            alert('failed to update post')
        }
    }
}

updatePostHandler.addEventListener('submit', updatePost)