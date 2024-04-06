const commentHandler = document.getElementById('new-comment');

const createComment = async (event) => {
    event.preventDefault();

    const content = document.getElementById('new-comment-content').value.trim();

    console.log(`${content}`);
    
    if (content) {
        const response = await fetch('/api/posts/newcomment', {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
        console.log(responseData)
        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert('failed to add comment')
        }
    }
    
}
    
 



commentHandler.addEventListener('submit', createComment)