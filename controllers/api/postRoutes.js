const router = require('express').Router();
const { Post } = require('../../models');

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

module.exports = router;