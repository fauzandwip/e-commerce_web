const UserController = require('../../controllers/UserController');

const router = require('express').Router();

router.post('/', UserController.createProfile);
router.put('/', UserController.updateProfile);

module.exports = router;
