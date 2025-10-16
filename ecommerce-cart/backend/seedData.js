const mongoose = require('mongoose');
const Product = require('./models/Product');

/**
 * Seed database with sample products
 * Run this file to populate the database with initial data
 */
const seedProducts = [
  {
    name: 'Tropical Paradise Hamper',
    price: 400.00,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400',
    description: 'Banana, Pawpaw, Pineapple, Grapes, Apple'
  },
  {
    name: 'Berry Delight',
    price: 800.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400',
    description: 'Fresh mixed berries basket'
  },
  {
    name: 'Citrus Burst',
    price: 100.00,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400',
    description: 'Oranges, Lemons, Grapefruits'
  },
  {
    name: 'Exotic Mix',
    price: 180.00,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
    description: 'Dragon fruit, Passion fruit, Kiwi'
  },
  {
    name: 'Classic Basket',
    price: 90.00,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    description: 'Traditional fruit selection'
  },
  {
    name: 'Premium Selection',
    price: 250.00,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400',
    description: 'Premium quality fruits'
  },
  {
    name: 'Family Pack',
    price: 200.00,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    description: 'Large family-sized basket'
  },
  {
    name: 'Gift Basket',
    price: 130.00,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1519996409144-56c88426df6f?w=400',
    description: 'Perfect for gifting'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-cart', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert seed data
    await Product.insertMany(seedProducts);
    console.log('Seed data inserted successfully');

    console.log(`${seedProducts.length} products added to database`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
