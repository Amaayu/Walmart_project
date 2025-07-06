require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const indexRouter = require('./routes/localStore');
const productRouter = require('./routes/productRoutes')
var QRCode = require('qrcode')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
 connectDB();

 // CORS Configuration for Product Server
const corsOptions = {
  origin: [
    'http://localhost:6000', // Allow Walmart server
    //'https://your-walmart-app.com' // Production domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/api/product', productRouter);

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// QR code genrate 
QRCode.toString('http://192.168.1.13:3000',{type:'terminal'}, function (err, url) {
  console.log(url)
})

// Error handling
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});