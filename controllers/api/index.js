const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Mount user routes
router.use('/users', userRoutes);

// Mount post routes
router.use('/posts', postRoutes);

module.exports = router;