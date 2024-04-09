const router = require('express').Router();
const { User } = require('../../models');


//creates a new user if criteria is good, otherwise sends a 500 internal error
router.post('/', async (req,res) => {
      
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        //saves loggedIn and userId under session variables that can be called elsewhere in the program
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

// loggs user in if criteria is good and sets session variables the same as the create user. if criteria is bad 500 internal error is crated
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
        res.status(500).json(error)
    }
    console.log(req.body.password)
})


// loggs user out and destroys ths loggedIn session variable
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