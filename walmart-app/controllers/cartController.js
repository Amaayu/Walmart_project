const Cart = require('../models/AddtoCart');
const axios = require('axios');
const { setTimeout } = require('timers/promises');

// // 🔹 POST /cart/add
exports.addToCart = async (req, res) => {
  const { title, productId, price, quantity, image } = req.body;

  try {
    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ items: [] });
    }

    // Check if product already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      // Increase quantity
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      // Add new item
      cart.items.push({
        title,
        productId,
        price,
        quantity: quantity || 1,
        image,
      });
    }

    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};

// Add to cart with expiration timer
// exports.addToCart = async (req, res) => {
//   const { title, productId, price, quantity, image, originalProduct } = req.body;

//   try {
//     let cart = await Cart.findOne();
//     if (!cart) cart = new Cart({ items: [] });

//     // Add new item
//     cart.items.push({
//       title,
//       productId,
//       price,
//       quantity: quantity || 1,
//       image,
//       addedAt: new Date(),
//       expiresAt: new Date(Date.now() + 600000), // 10 minutes
//       originalProduct // Store for potential restoration
//     });

//     cart.updatedAt = new Date();
//     await cart.save();

//     // Schedule expiration check
//     scheduleExpirationCheck(productId, originalProduct);

//     res.status(200).json({ 
//       message: "Item added to cart", 
//       cart,
//       redirect: "/add-card-page" 
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Add to cart failed', details: err.message });
//   }
// };

// Schedule expiration check
// const scheduleExpirationCheck = (productId, originalProduct) => {
//   setTimeout(600000, productId, originalProduct) // 10 minutes
//     .then(async (productId) => {
//       const cart = await Cart.findOne();
//       if (!cart) return;
      
//       const itemIndex = cart.items.findIndex(item => item.productId === productId);
//       if (itemIndex === -1) return;

//       // Remove from cart
//       const [removedItem] = cart.items.splice(itemIndex, 1);
//       await cart.save();

//       // Restore to product server
//       await axios.post('http://192.168.2.129:3000/api/products/restore', {
//         ...removedItem.originalProduct,
//         createdAt: new Date() // Reset creation time
//       });
//     })
//     .catch(err => console.error('Expiration check failed:', err));
// };

// 🔹 GET /cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};

// 🔹 DELETE /cart/remove/:productId
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};

