const router = require('express').Router();

const apiRoutes = require('./api.routes');

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'M-Pesa API',
  });
});

router.use('/api', apiRoutes);

module.exports = router;
