const router = require('express').Router();

// controllers
const userController = require('../controllers/userController');

const checkAuth = require('../controllers/middleware/checkAuth');

// routes
router.get('/:id', checkAuth, userController.find);
router.put('/:id', checkAuth, userController.update);
router.delete('/:id', checkAuth, userController.delete);

module.exports = router;
