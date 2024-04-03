const sequelize = require('../config/connection');
const seedUser = require('./userData');
const SeedPost = require('./postData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUser();
    console.log('----Users Seeded----');
    await SeedPost();
    console.log('----Posts Seeded----');

    process.exit(0);
};

seedAll();