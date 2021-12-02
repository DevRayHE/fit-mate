const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

const dashboardRoutes = require('./dashboardRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/leaderboard', leaderboardRoutes);

module.exports = router;

