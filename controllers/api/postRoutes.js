const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            post_title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        })
        res.status(200).json(dbPostData);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})

router.post('/newcomment', async (req, res) => {
    try{
         const dbCommentData = await Comment.create({
            content: req.body.content,
            user_id: req.session.userId,
            post_id: req.session.postId
         })
         res.status(200).json(dbCommentData)
    } catch (error){
        console.error(error);
        res.status(500).json(error);
    }
})

module.exports = router;