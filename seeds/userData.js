const { User } = require('../models');
//dummy user data
const userData = [
    {
        username: "codeguy183",
        email: 'codeguy@gmail.com',
        password: 'iwritecode'
    },
    {
        username: "pythonexpert",
        email: 'aibuilder@gmail.com',
        password: 'cookies123'
    },
    {
        username: "juniordev",
        email: 'firstjob@gmail.com',
        password: 'th1s1saw3som3'
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;