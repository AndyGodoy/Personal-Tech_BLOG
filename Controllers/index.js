const router = require('express').Router();
const authRoutes = require('./authController');
const dashboardRoutes = require('./dashboardController');
const homepageRoutes = require('./homepageController');

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homepageRoutes);

module.exports = router;
