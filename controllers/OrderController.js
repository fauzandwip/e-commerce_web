const {
  Order,
  OrderItem,
  Product,
  User,
  Profile,
  sequelize,
} = require('../models');

class OrderController {
  static async createOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id: user_id } = req.user;
      const { items } = req.body;

      const profile = await Profile.findOne({ where: { user_id } });
      if (!profile) {
        throw {
          name: 'BadRequest',
          message: 'Profile must be filled first',
        };
      }

      if (items.length < 1) {
        throw {
          name: 'BadRequest',
          message: 'Products is required',
        };
      }

      const products = await Product.findAll({
        where: { id: items.map((item) => item.id) },
      });

      let totalAmount = 0;
      for (const item of items) {
        const product = products.find((data) => data.id === item.id);
        if (product.stock < item.quantity) {
          throw {
            name: 'BadRequest',
            message: `Insufficient stock for product ${product.id}`,
          };
        }
        totalAmount += item.quantity * product.price;
        product.stock -= item.quantity;
        await product.save({ transaction: t });
      }

      const newOrder = await Order.create(
        {
          user_id,
          total_amount: totalAmount,
        },
        { transaction: t },
      );

      for (const item of items) {
        await OrderItem.create(
          {
            order_id: newOrder.id,
            product_id: item.id,
            quantity: item.quantity,
          },
          { transaction: t },
        );
      }

      await t.commit();
      res.status(201).json({
        status: 'success',
        message: 'Successfully created the order',
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['email', 'role'],
            as: 'user',
            include: {
              model: Profile,
              as: 'profile',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          },
          {
            model: OrderItem,
            as: 'items',
            include: {
              model: Product,
              as: 'product',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          },
        ],
      });

      if (!order) {
        throw {
          name: 'NotFound',
          message: 'Order not found',
        };
      }

      res.status(200).json({
        status: 'success',
        message: 'Successfully get the order',
        body: order,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateOrderStatus(req, res, next) {
    try {
      const { id: orderId } = req.params;
      const { status } = req.body;
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw {
          name: 'NotFound',
          message: 'Order not found',
        };
      }

      await order.update({ status });

      res.status(200).json({
        status: 'success',
        message: 'Successfully updated status order',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
