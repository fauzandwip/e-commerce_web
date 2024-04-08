const UserController = require('../../controllers/UserController');
const authentication = require('../../middlewares/authentication');

const router = require('express').Router();

router.use(authentication);
router.post('/', UserController.createProfile);
router.put('/', UserController.updateProfile);

module.exports = router;
