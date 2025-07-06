const express = require('express')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT
const userRouter = require('./router/user')
const connectDB = require('./config/db')
const cors = require('cors');
const cartRouter = require('./router/cartRoutes')

// Connect to database
 connectDB();

 // CORS Configuration for Walmart Server
const corsOptions = {
  origin: [
    'http://localhost:3000', // Allow Product server
   // 'https://your-product-server.com' // Production domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json())


// Routers
app.use('/',userRouter)
app.use('/api/', cartRouter);

app.listen(PORT || 6000 ,()=>{
  console.log(`✅ Server running on http://localhost:${PORT}`);
})