const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic product info
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  
  // Pricing and inventory
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0.01, 'Price must be at least 0.01']
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function(value) {
        return value < this.price;
      },
      message: 'Discount price must be less than regular price'
    }
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  
  // Product details
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'Chocolate', 'Oatmeal', 'Butter', 'Sugar', 'Gluten-Free', 
        'Vegan', 'Organic', 'Seasonal', 'Assorted', 'Other'
      ],
      message: 'Invalid category'
    }
  },
  weight: {
    type: Number, // Weight in grams
    required: [true, 'Product weight is required']
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients list is required'],
    validate: {
      validator: function(ingredients) {
        return ingredients.length > 0;
      },
      message: 'At least one ingredient is required'
    }
  },
  dietaryInfo: {
    glutenFree: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    organic: { type: Boolean, default: false },
    kosher: { type: Boolean, default: false }
  },
  
  // Visuals and presentation
  images: {
    type: [String],
    
  },
  
  // Ratings and popularity
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  // Store management
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for display price
productSchema.virtual('displayPrice').get(function() {
  return this.discountPrice || this.price;
});

// Update timestamp on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update timestamp on update operations
productSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;