const express = require('express');
const router = express.Router();


//Handling GET requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.get('/:orderID', (req, res, next) => {
    let id = req.params.orderID;
    res.status(200).json({
        message: 'Order details',
        orderId: id
    });
});

//Handling POST requests
router.post('/', (req, res, next) => {
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message: 'Order was created',
        order: order
    });
});


//Handling DELETE requests
router.delete('/:orderID', (req, res, next) => {
    let id = req.params.orderID;
    res.status(200).json({
        message: 'Order deleted',
        orderId: id
    });
});

module.exports = router;