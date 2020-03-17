const router = require('express').Router();

// controllers
const caffeController = require('../controllers/caffeController');

const checkAuth = require('../controllers/middleware/checkAuth');

// routes
router.post('/', checkAuth, caffeController.create);
router.get('/', checkAuth, caffeController.list);
router.get('/:id', checkAuth, caffeController.find);
router.put('/:id', checkAuth, caffeController.update);
router.delete('/:id', checkAuth, caffeController.delete);

module.exports = router;
