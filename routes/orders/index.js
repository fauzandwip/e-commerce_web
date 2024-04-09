const OrderController = require('../../controllers/OrderController');
const { guardGetOrder } = require('../../middlewares/authorization');

const router = require('express').Router();

router.post('/', OrderController.createOrder);
router.get('/:id', guardGetOrder, OrderController.getOrderById);

module.exports = router;
