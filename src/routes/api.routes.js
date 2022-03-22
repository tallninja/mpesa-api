const router = require('express').Router();

const paymentsRoutes = require('./payments.routes');

router.use('/payments', paymentsRoutes);

module.exports = router;
