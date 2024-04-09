const { Order, OrderItem, Product, sequelize } = require('../models');

class OrderController {
  static async createOrder(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id: user_id } = req.user;
      const { products } = req.body;

      if (products.length < 1) {
        throw {
          name: 'BadRequest',
          message: 'Products is required',
        };
      }

      const dataProducts = await Product.findAll({
        where: { id: products.map((product) => product.id) },
      });

      let totalAmount = 0;
      for (const product of products) {
        const dataProduct = dataProducts.find((data) => data.id === product.id);
        if (dataProduct.stock < product.quantity) {
          throw {
            name: 'BadRequest',
            message: `Insufficient stock for product ${dataProduct.id}`,
          };
        }
        totalAmount += product.quantity;
        dataProduct.stock -= product.quantity;
        await dataProduct.save();
      }

      const newOrder = await Order.create(
        {
          user_id,
          total_amount: totalAmount,
        },
        { transaction: t },
      );

      for (const product of products) {
        await OrderItem.create(
          {
            order_id: newOrder.id,
            product_id: product.id,
            quantity: product.quantity,
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
}

module.exports = OrderController;
