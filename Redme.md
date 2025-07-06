# Smart Checkout System – Backend

This project is a **Smart Checkout System** designed to reduce waiting lines in stores by allowing customers to scan items themselves using a mobile/web interface. It has two separate backend servers handling different functionalities:

- `walmart-local-store`: Handles product inventory and item redemption at the store level.
- `walmart-app`: Handles user carts, QR-based redemption, and payment flow.

---

## 🧠 Tech Stack

- Node.js
- Express.js
- MongoDB
- RESTful APIs

---

## 🗂️ Project Structure

```bash
WALMART_PROJECT/
├── walmart-local-store/
│   ├── .env
│   ├── routes/
│   └── controllers/
├── walmart-app/
│   ├── .env
│   ├── routes/
│   └── controllers/


⚙️ Setup Instructions

Clone the repository:
git clone https://github.com/Amaayu/Walmart_project.git
cd smart-checkout-backend
Install dependencies for both servers:
cd walmart-local-store
npm install
RUN npm run dev


cd walmart-app
npm install
RUN npm run dev


Add your environment variables (.env) in both folders:
MONGO_URI=mongodb+srv://<your-credentials>
PORT=3000 for local-store
PORT=6000 for walmart-app
Run the servers:
# Start Local Store Server
cd walmart-local-store
npm start

# Start App Server
cd ../walmart-app
npm start
🔁 Working Guide (Flow)

Product Upload
Admin uploads products to the store database using the walmart-local-store server.
QR Scan & Redemption
User scans products using a QR interface. The scanned data is sent from the store’s microcontroller to the app server (walmart-app).
Cart Management
The app server adds redeemed products to the user’s cart.
Checkout & Payment
User initiates checkout. If the payment is successful, order is confirmed. If it fails, all cart items are removed automatically.
📦 API Documentation

🏪 walmart-local-store Server (PORT: 3000)
Base Route – Health Check

GET /
→ Returns "Hello from Local Store"
Admin Dashboard - Product APIs

Create a New Product
POST /api/products
Body: {
  "name": "Product Name",
  "price": 99,
  "quantity": 10
}
Get All Products
GET /api/products
→ Returns array of all available products
🛒 walmart-app Server (PORT: 3001 or your choice)
Cart APIs

Add to Cart
POST /cart/add
Body: {
  "userId": "user123",
  "productId": "product123",
  "quantity": 2
}
View Cart
GET /cart?userId=user123
→ Returns user's current cart
Remove from Cart
DELETE /cart/remove/:productId?userId=user123
→ Removes a specific product from user's cart
QR Scan Redemption Route

Receive Redeemed Product Data
POST /
→ Accepts product scan data from QR system (usually from local store microcontroller)
→ Adds products to the user’s cart
💡 This route is crucial for syncing scanned products from the store to the user's cart in real-time.
❌ Payment Failure Handling

If payment fails after checkout is initiated, the app server will automatically remove all items from the user's cart to ensure system consistency.

📌 Future Scope

Add authentication for admin & customers
Integrate Stripe/Razorpay for real payments
Improve QR scan speed and reliability
Add inventory auto-update logic
📄 License

This project is licensed under MIT.

