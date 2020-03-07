const router = require('express').Router();

// controllers
const qrController = require('../controllers/qrController');

const checkAuth = require('../controllers/middleware/checkAuth');

// routes
router.post('/', checkAuth, qrController.create);
router.get('/:id', checkAuth, qrController.find);
router.put('/:id', checkAuth, qrController.update);
router.delete('/:id', checkAuth, qrController.delete);

module.exports = router;
