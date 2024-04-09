const UserController = require('../../controllers/UserController');
const authentication = require('../../middlewares/authentication');

const router = require('express').Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.put('/password', authentication, UserController.resetPassword);

module.exports = router;
