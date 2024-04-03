const { Post } = require('../models');
const postData = [
    {
        post_title: "Love to be doing it",
        content: 'Writing code is one of my favorite hobbies!',
        user_id: 1,
    },
    {
        post_title: "Python is of the future",
        content: 'Python is my language of choice when i am working on AI.',
        user_id: 2
    },
    {
        post_title: "Brand new and ready to learn",
        content: 'I juat got my first job and man is it rewarding to be in this field!',
        user_id: 3
    }
];

const SeedPost = () => Post.bulkCreate(postData);
module.exports = SeedPost;