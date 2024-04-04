const router = require('express').Router();
const { User, Post } = require('../models');

const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
            ],
        });
        console.log(req.session);
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        });
    }catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/dashboard/:id', async (req,res) => {
    try{
        const dbUserData = await Post.findAll({
            where: { user_id: req.params.id }
        })

        const posts = dbUserData.map((post) => post.get({ plain: true }));
        
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        })

    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        console.log('logged in');
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;