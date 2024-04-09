const OrderController = require('../../controllers/OrderController');
const {
  guardGetOrder,
  guardAdmin,
} = require('../../middlewares/authorization');

const router = require('express').Router();

router.post('/', OrderController.createOrder);
router.get('/:id', guardGetOrder, OrderController.getOrderById);
router.patch('/:id/status', guardAdmin, OrderController.updateOrderStatus);

module.exports = router;
