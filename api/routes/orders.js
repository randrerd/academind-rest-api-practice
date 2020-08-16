const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');
const { response } = require('express');

//Handling GET requests
router.get('/', (req, res, next) => {
  Order.find()
    .select('-__v')
    .populate('product')
    .exec()
    .then((docs) => {
      if (docs.length) {
        const response = {
          count: docs.length,
          orders: docs.map((doc) => {
            console.log(doc);
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
              request: {
                type: 'GET',
                url: `http://localhost:3000/orders/${doc._id}`,
              },
            };
          }),
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'No Entries Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

async function getProductInfo(id) {
  try {
    let response = Product.findById(id).exec();
    let data = await response;
    return data;
  } catch (error) {
    console.log(error);
  }
}

router.get('/:orderID', (req, res, next) => {
  Order.findById(req.params.orderID)
    .populate('product')
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({
        order: {
          id: order._id,
          product: order.product,
          quantity: order.quantity,
        },
        request: {
          type: 'GET',
          url: `http://localhost:3000/orders`,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//Handling POST requests
router.post('/', (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId).then((product) => {
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId,
    });
    order
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          messsage: 'Order Created!',
          createdOrder: {
            id: result._id,
            product: product.name,
            product: result.productId,
            quantity: result.quantity,
          },
          request: {
            type: 'GET',
            url: `http://localhost:3000/orders/${result._id}`,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
});

//Handling DELETE requests
router.delete('/:orderID', (req, res, next) => {
  let id = req.params.orderID;
  Order.deleteOne({ _id: id })
    .exec()
    .then((response) => {
      res.status(200).json({
        message: 'Order deleted succesfuly',
        request: {
          type: 'POST',
          url: `http://localhost:3000/orders`,
          body: {
            productId: 'ID',
            quantity: 'Number',
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
