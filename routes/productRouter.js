const productController = require('../app/controllers/ProductController');

// router
const router = require('express').Router();

router.get('/show', productController.showProducts);
router.post('/addProduct', productController.upload, productController.addProduct);
// Products router
router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.upload, productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router;