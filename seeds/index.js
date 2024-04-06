const sequelize = require('../config/connection');
const seedUser = require('./userData');
const SeedPost = require('./postData');
const seedComment = require('./commentData');


//imports all other seed files and uses an asynchonus funciton to seed the database 1 file at a time
const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUser();
    console.log('----Users Seeded----');
    await SeedPost();
    console.log('----Posts Seeded----');
    await seedComment();
    console.log('----Comments Seeded----');

    process.exit(0);
};

seedAll();