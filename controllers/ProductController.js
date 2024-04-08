const { Product } = require('../models');

class ProductController {
  static async addProduct(req, res, next) {
    try {
      const { title, description, price, stock, brand, category, thumbnail } =
        req.body;

      const newProduct = await Product.create({
        title,
        description,
        price,
        stock,
        brand,
        category,
        thumbnail,
      });

      res.status(201).json({
        status: 'success',
        message: 'Successfully add new product',
        body: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getProducts(req, res, next) {
    try {
      const products = await Product.findAll();

      res.status(200).json({
        status: 'success',
        message: 'Successfully get all products',
        body: products,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const { id: productId } = req.params;
      const product = await Product.findByPk(productId);

      res.status(200).json({
        status: 'success',
        message: 'Successfully get product',
        body: product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateProductById(req, res, next) {
    try {
      const { id: productId } = req.params;
      const { title, description, price, stock, brand, category, thumbnail } =
        req.body;
      const product = await Product.findByPk(productId);

      if (!product) {
        throw {
          name: 'NotFound',
          message: 'Product not found',
        };
      }

      const updatedProduct = await product.update({
        title,
        description,
        price,
        stock,
        brand,
        category,
        thumbnail,
      });

      res.status(200).json({
        status: 'success',
        message: 'Successfully updated the product',
        body: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProductById(req, res, next) {
    try {
      const { id: productId } = req.params;
      const product = await Product.findByPk(productId);

      if (!product) {
        throw {
          name: 'NotFound',
          message: 'Product not found',
        };
      }

      await product.destroy();

      res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the product',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
