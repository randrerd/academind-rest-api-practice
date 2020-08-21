const Product = require('../models/product');
const mongoose = require('mongoose');

module.exports.products_get_all = (req, res, next) => {
  Product.find()
    .select('-__v')
    .exec()
    .then((docs) => {
      if (docs.length) {
        const response = {
          count: docs.length,
          products: docs.map((doc) => {
            return {
              name: doc.name,
              price: doc.price,
              productImage: doc.productImage,
              _id: doc._id,
              request: {
                type: 'GET',
                url: `http://localhost:3000/products/${doc._id}`,
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
};

module.exports.products_get_one = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('-__v')
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'ID not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.products_create_one = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Product created succesfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/products/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.products_update_one = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    //Gets the property name passed on the req body
    //sets it on the updateOps
    //previously created object and stores the
    //passed value
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      if (!result.ok) {
        res.status(400).json({ message: 'The request body is invalid' });
      }
      res.status(200).json({
        message: 'Your product has been updated',
        request: {
          type: 'GET',
          url: `http://localhost:3000/products/${id}`,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.products_delete_one = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product deleted',
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
