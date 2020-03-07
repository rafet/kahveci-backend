const router = require('express').Router();

// controllers
const orderController = require('../controllers/orderController');

const checkAuth = require('../controllers/middleware/checkAuth');

// routes
router.post('/', checkAuth, orderController.create);
router.get('/:id', checkAuth, orderController.find);
router.put('/:id', checkAuth, orderController.update);
router.delete('/:id', checkAuth, orderController.delete);

module.exports = router;
