const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dotenvResult = dotenv.config();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
  process.env.STRING_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true
  }
);


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

//Routes for request handling
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3000, () => {
  console.log('Server started');
});