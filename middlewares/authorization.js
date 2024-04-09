const { Order } = require('../models');

const guardAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== 'admin') {
      throw {
        name: 'Forbidden',
        message: 'You are not authorized, ADMIN only',
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};
const guardGetOrder = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id: orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      throw {
        name: 'NotFound',
        message: 'Order not found',
      };
    }

    if (role !== 'admin' && order.user_id !== userId) {
      throw {
        name: 'Forbidden',
        message: 'You are not authorized',
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  guardAdmin,
  guardGetOrder,
};
