const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const auth = require('../utils/auth');

// displays the homepage
router.get('/', auth, async (req, res) => {
    try{
        //finds all posts from the database and includes the associated usernames from the user model
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
            ],
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        //renders the hompage template and passes in posts, loggedIn and userId session variables and showDashboard vairable
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

// brings logged in user to their personal dashboard where all of their individual posts are displayed and they can create new posts
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


// if user is nor logged in than the login template is rendered
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        console.log('logged in');
        res.redirect('/');
        return;
    }

    res.render('login');
})


//if the user is not logged in than the signup template is rendered
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        console.log('logged in');
        res.redirect('/');
        return;
    }

    res.render('signup');
})


// displays a specific posts and all associated comments
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


        // renders the post template and passes in variables, postId is created as a session variable here which will be used to create new comments related to this post
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

// renders the newpost template
router.get('/newpost', auth, (req, res) => {
    res.render('newpost', {
        userId: req.session.userId,
        loggedIn: req.session.loggedIn,
        showDashboard: false
    })
})

// renders the newcomment template and pulls in the related post for the user to reference whiel writing their comment
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

router.get('/editpost/:id', async (req, res) => {
    try{

        req.session.postId = req.params.id;

        const dbPostData = await Post.findByPk(req.session.postId, {
            include:[
                {
                    model: User,
                    attributes: ['username']
                }
            ]});
        const post = dbPostData.get({ plain: true });


        // renders the post template and passes in variables, postId is created as a session variable here which will be used to create new comments related to this post
        res.render('editpost', {
            loggedIn: req.session.loggedIn,
            showDashboard: false,
            postId: req.session.postId,
            post
        })

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;