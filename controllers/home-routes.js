const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const auth = require('../utils/auth');


router.get('/', auth, async (req, res) => {
    try{
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
            ],
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            showDashboard: true
        });
    }catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.get('/dashboard/:id', auth, async (req,res) => {
    try{
        const dbUserData = await Post.findAll({
            where: { user_id: req.params.id }
        })

        const posts = dbUserData.map((post) => post.get({ plain: true }));
        
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            showDashboard: false
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

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        console.log('logged in');
        res.redirect('/');
        return;
    }

    res.render('signup');
})

router.get('/posts/:id', auth, async (req, res) => {
    try{
        const dbCommentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        })
        req.session.postId = req.params.id;

        const comments = dbCommentData.map((comment) => comment.get({ plain: true }));

        const dbPostData = await Post.findByPk(req.params.id, {
            include:[
                {
                    model: User,
                    attributes: ['username']
                }
            ]});
        const post = dbPostData.get({ plain: true });

        res.render('post', {
            loggedIn: req.session.loggedIn,
            showDashboard: false,
            postId: req.session.postId,
            post,
            comments

        })

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


router.get('/newpost', auth, (req, res) => {
    res.render('newpost', {
        userId: req.session.userId,
        loggedIn: req.session.loggedIn,
        showDashboard: false
    })
})

router.get('/newcomment', auth, async (req, res) => {

    const dbPostData = await Post.findByPk(req.session.postId, {
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    const post = dbPostData.get({ plain: true });

    res.render('newcomment', {
        loggedIn: req.session.loggedIn,
        showDashboard: false,
        postId: req.session.postId,
        post
    });
})

module.exports = router;