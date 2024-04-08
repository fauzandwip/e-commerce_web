const UserController = require('../controllers/UserController');

const router = require('express').Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use('/profiles', require('./profiles'));

module.exports = router;
