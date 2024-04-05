const commentHandler = document.getElementById('add-comment');

const createComment = async (event) => {
    event.preventDefault();
    console.log('i worked!');
} 



commentHandler.addEventListener('click', createComment)