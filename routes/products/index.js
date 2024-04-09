const ProductController = require('../../controllers/ProductController');
const { guardAdmin } = require('../../middlewares/authorization');

const router = require('express').Router();

router.post('/', ProductController.addProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

router.use(guardAdmin);
router.put('/:id', ProductController.updateProductById);
router.delete('/:id', ProductController.deleteProductById);

module.exports = router;
