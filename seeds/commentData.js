
//dummy comment data to be seeded
const { Comment } = require('../models');

const commentData = [
    {
        content: 'Really love this!',
        user_id: 2,
        post_id: 3
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;