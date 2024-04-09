const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.use('/auth', require('./auth'));

router.use(authentication);
router.use('/profiles', require('./profiles'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;
