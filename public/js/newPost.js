const newPostButton = document.getElementById('new-post');


// retrieves the post title and  content and creates a fetch-post request to create a new post in the database
const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.getElementById('new-post-title').value.trim();
    const content = document.getElementById('new-post-content').value.trim();

    console.log(`\n${title}\n${content}`)

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert('failed to make post');
        }
    }
}

newPostButton.addEventListener('submit', newPostHandler);