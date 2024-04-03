const router = require('express').Router();
const { User, Post } = require('../models');

const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts
        });
    }catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;