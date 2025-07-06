const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  productId: {
    type: String, // can be anything, even from a different system
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  image: {
    type: String, // optional image URL
  }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
