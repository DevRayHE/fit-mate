const router = require('express').Router();

const userRoutes = require('./userRoutes');
const exerciseRecordRoutes = require('./exerciseRecordRoutes');

router.use('/users', userRoutes);
router.use('/exercise', exerciseRecordRoutes);

module.exports = router;