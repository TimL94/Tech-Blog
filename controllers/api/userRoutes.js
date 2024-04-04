const router = require('express').Router();
const { User } = require('../../models');

// Define user routes here

router.post('/', async (req,res) => {
      
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() =>{
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;

            res.status(200).json(dbUserData);
        }) 
    } catch (error){
        console.error(error);
        res.status(500).json(error);
    }
    
})

router.post('/login', async (req,res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(!dbUserData) {
            res.status(400).json({error: 'inccorect email or password'});
            return;
        }

        const validatePassword = await dbUserData.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ error: 'incorrect email or password'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;
            res.status(200).json({ message: 'succesful login attempt' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'User now logged in'})
    }
    console.log(req.body.password)
})

router.post('/logout', (req, res) => {
    console.log('\nim here\n')
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        })
    } else {
        res.status(404).end();
    }
})

module.exports = router;