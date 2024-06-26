const router = require('express').Router();
const { Post, Comment } = require('../../models');

// creates a new post if the criteria is god, otherwise sends a 500 internal error
router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            post_title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        })
        res.status(200).json(dbPostData)

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})

// creates a new comment if the criteria is good, otherwise sends a 500 internal error
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


// Updates a post using the session variable postId to identify the specific post
router.put('/updatepost', async (req, res) => {
    try{
        console.log(req.body);

        const updatePost = await Post.update(req.body, {
            where: {
                id: req.session.postId
            },
            individualHooks: true
        });
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json(error)
    }
})


//deletes a sepecific post based on the id passsed in through the url parameters
router.delete('/deletepost/:id', async (req, res) => {
    try{
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({message: 'post removed'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;