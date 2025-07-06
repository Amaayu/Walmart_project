const axios = require('axios');
const users = require('../models/user')

exports.userHelth = async(req , res )=>{

    res.json({
        mesaage: "hello mere pyaro bacho "
    })

}

// This is your receiving endpoint on port 6000
// exports.receveDeletdata = async (req, res) => {
//   try {
//     const dataOld = req.body; // Data sent from the other server

//     console.log('Received deleted product data:', dataOld);

//     const data = dataOld

//     // Map the received product to cart-compatible format
//     const mappedProduct = {
//       title: data.name || "No Title",
//       productId: data._id || data.id,
//       price: Math.round((data.price || 0) * 100), // convert to paisa
//       quantity: data.quantity || 1,
//       image: (data.images && data.images.length > 0) ? data.images[0] : "https://example.com/default-image.jpg"
//     };

//     // Send data to "add to cart" endpoint
//     try {
//       const response = await axios.post(
//         'http://localhost:6000/api/cart/add',
//         mappedProduct,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log('Data sent to add to cart:', response.data);
//     } catch (axiosError) {
//       console.error('Error sending data to cart endpoint:', axiosError.message);
//     }
    
//     var upiVar = true
//     // if upi var is true 
//    // 10 min wait if upi var is true 
//    setTimeout(()=>{
//     if(!upiVar === true)
    
//    // remove the item to the card sectiont 

//    try {
//     const data = axios.delete(`http://localhost:6000/api/cart/remove/${data._id}`)
//    } catch (error) {
    
//    }


//    // and sent the resves olddata return the local- walmart store db
//  try {
//      const data = axios.post('http://localhost:3000/api/product',dataOld,
//         {
//             headers:{
//                 'Content-Type': 'application/json',
//             }
//         }
//      )
//  } catch (error) {
    
//  }


//    })


//     if (upiVar) {
//      // Final response to sender
//      res.json({
//       message: "Received and processed data successfully",
//       data: mappedProduct,
//     });
        
//     } else {

//         res.json({
//        message: "upi paymant failiur user not pay bils",
//         data: mappedProduct,
//     });
        
//     }
    

//   } catch (error) {
//     res.status(500).json({
//       message: "Error receiving or processing data",
//       error: error.message,
//     });
//   }
// };

// This is your receiving endpoint on port 6000
exports.receveDeletdata = async (req, res) => {
  try {
    const receivedData = req.body;

    console.log('Received deleted product data:', receivedData);

    // Step 1: Map to cart format
    const mappedProduct = {
      title: receivedData.name || "No Title",
      productId: receivedData._id || receivedData.id,
      price: Math.round((receivedData.price || 0) * 100), // in paisa
      quantity: receivedData.quantity || 1,
      image: (receivedData.images && receivedData.images.length > 0) ? receivedData.images[0] : "https://example.com/default-image.jpg"
    };

    // Step 2: Send to /cart/add
    try {
      const cartResponse = await axios.post('http://localhost:6000/api/cart/add', mappedProduct, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('✅ Added to cart:', cartResponse.data);
    } catch (err) {
      console.error('❌ Error adding to cart:', err.message);
      return res.status(500).json({ message: 'Failed to add to cart' });
    }

    // Step 3: Simulate UPI logic
    let upiVar = false; // Let's assume the user has NOT paid yet

    // Step 4: Wait 10 minutes (600,000ms)
    console.log('⏳ Waiting 10 minutes for UPI payment...');
    await new Promise(resolve => setTimeout(resolve, 60000)); // 10 minutes
      
    if (upiVar === false) {
      // Step 5a: Remove from cart if payment not done
      try {
        const deleteResponse = await axios.delete(`http://localhost:6000/api/cart/remove/${receivedData._id}`);
        console.log('🗑️ Removed from cart:', deleteResponse.data);
      } catch (err) {
        console.error('❌ Error removing from cart:', err.message);
      }

      // Step 5b: Send product back to local store
      try {
        const restoreResponse = await axios.post('http://localhost:3000/api/product', receivedData, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('📦 Restored product to inventory:', restoreResponse.data);
      } catch (err) {
        console.error('❌ Error restoring product:', err.message);
      }

      return res.json({
        message: "⛔ Payment failed. Product removed from cart and returned to store.",
        product: mappedProduct
      });
    }

    // Step 6: If payment was successful
    return res.json({
      message: "✅ Payment successful. Product will be shipped.",
      product: mappedProduct
    });

  } catch (error) {
    console.error('❌ Error in handler:', error.message);
    return res.status(500).json({
      message: "Server error while processing product",
      error: error.message
    });
  }
};
