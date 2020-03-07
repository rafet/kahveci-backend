const router = require('express').Router();

// controllers
const cafeController = require('../controllers/cafeController');

const checkAuth = require('../controllers/middleware/checkAuth');

// routes
router.get('/:id', checkAuth, cafeController.find);
router.put('/:id', checkAuth, cafeController.update);
router.delete('/:id', checkAuth, cafeController.delete);

module.exports = router;
