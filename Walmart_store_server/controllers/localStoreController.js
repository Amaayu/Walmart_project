const Product = require('../models/ProductModel');
const axios = require('axios');

// Hello world endpoint
// exports.getHello = async (req, res) => {
//   try {
//     // 1. Get all products sorted by creation date (newest first)
//     const products = await Product.find().sort({ createdAt: -1 });

//     // 2. Check if any products exist
//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found' });
//     }

//     // 3. Get the last product (oldest)
//     const lastProduct = products[products.length - 1];

//     // 4. Delete the last product from the database
//     const deletedProduct = await Product.findByIdAndDelete(lastProduct._id);

//     // 5. Send data to Walmart app server
//     try {
//       const response = await axios.post('http://localhost:6000', deletedProduct, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('Data sent to Walmart server:', response.data);
//     } catch (error) {
//       console.error('Error sending data to Walmart server:', error.message);
//     }

//     // 6. Final response
//     res.json({
//       message: 'Last product deleted and sent successfully',
//       deletedProduct: deletedProduct,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// };

exports.getHello = async (req, res) => {
  try {
    // 1. Get all products sorted by creation date (newest first)
    const products = await Product.find().sort({ createdAt: -1 });

    // 2. Check if any products exist
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // 3. Get the last product (oldest)
    const lastProduct = products[products.length - 1];

    // 4. Delete the last product from the database
    const deletedProduct = await Product.findByIdAndDelete(lastProduct._id);

    // ✅ 5. Fire-and-forget: Send data to Walmart app server (without await)
    axios.post('http://localhost:6000', deletedProduct, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      console.log('✅ Data sent to Walmart server:', response.data);
    }).catch(error => {
      console.error('❌ Error sending data to Walmart server:', error.message);
    });

    // ✅ 6. Final response without waiting
    res.json({
      message: 'Product deleted. Data is being sent in background.',
      deletedProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
