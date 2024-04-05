const sequelize = require('../config/connection');
const seedUser = require('./userData');
const SeedPost = require('./postData');
const seedComment = require('./commentData');

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