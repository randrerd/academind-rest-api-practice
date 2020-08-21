const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

//Handling GET requests
router.get('/', checkAuth, OrdersController.orders_get_all);

router.get('/:orderID', checkAuth, OrdersController.orders_get_one);

//Handling POST requests
router.post('/', checkAuth, OrdersController.orders_create_one);

//Handling DELETE requests
router.delete('/:orderID', checkAuth, OrdersController.orders_delete_one);

module.exports = router;
