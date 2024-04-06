const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');


// this file imports all models and creates the necessary connections than exports the models
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})



module.exports = { User, Post, Comment };