const router = require('express').Router();

// controllers
const productController = require('../controllers/productController');

const checkAuth = require('../controllers/middleware/checkAuth');

// routes
router.post('/', checkAuth, productController.create);
router.get('/', checkAuth, productController.list);
router.get('/:id', checkAuth, productController.find);
router.put('/:id', checkAuth, productController.update);
router.delete('/:id', checkAuth, productController.delete);

module.exports = router;
