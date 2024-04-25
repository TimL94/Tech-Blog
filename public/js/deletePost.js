const deletePostHandlers = document.querySelectorAll('.delete-form');


// creates a event listener for each post that is generated and if the user clicks the delete button the user is prompted to confirm and the post is deleted
const deletePost = async (event) => {
    event.preventDefault();

    console.log('\nim here\n')

    const form = event.target;
    const postId = form.querySelector('.delete-post').value.trim();

    const confirmDelete = window.confirm('are you sure you want to delete this post?');

    if (confirmDelete) {
       try{
            const response =  await fetch(`/api/posts/deletepost/${postId}`, {
                method:'DELETE',
                headers: {'Content-Type': 'application/json'}
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('failed to delete post');
            }
       } catch (error) {
        console.error(error);
       }
    }
}

 for (let i=0; i < deletePostHandlers.length; i++) {
    deletePostHandlers[i].addEventListener('submit', deletePost);
 }