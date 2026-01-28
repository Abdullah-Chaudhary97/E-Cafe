const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ECafe';

const products = [
  // Coffee
  {
    title: 'Espresso',
    productTitle: 'Espresso',
    description: 'Rich and bold espresso shot, perfect for coffee lovers',
    price: '$3.50',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500',
    category: 'coffee',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Cappuccino',
    productTitle: 'Cappuccino',
    description: 'Espresso with steamed milk and foam, classic Italian favorite',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500',
    category: 'coffee',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Latte',
    productTitle: 'Latte',
    description: 'Smooth espresso with steamed milk, topped with foam',
    price: '$4.75',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500',
    category: 'coffee',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Americano',
    productTitle: 'Americano',
    description: 'Espresso shots with hot water, strong and smooth',
    price: '$3.75',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500',
    category: 'coffee',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Mocha',
    productTitle: 'Mocha',
    description: 'Espresso with chocolate and steamed milk, sweet and rich',
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500',
    category: 'coffee',
    inStock: true,
    stockQuantity: 100,
  },

  // Tea
  {
    title: 'Green Tea',
    productTitle: 'Green Tea',
    description: 'Fresh and healthy green tea, packed with antioxidants',
    price: '$3.00',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
    category: 'tea',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Black Tea',
    productTitle: 'Black Tea',
    description: 'Strong and robust black tea, perfect morning boost',
    price: '$3.00',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
    category: 'tea',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Chai Latte',
    productTitle: 'Chai Latte',
    description: 'Spiced tea with steamed milk, warm and comforting',
    price: '$4.25',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500',
    category: 'tea',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Earl Grey',
    productTitle: 'Earl Grey',
    description: 'Classic Earl Grey with bergamot, elegant and refined',
    price: '$3.50',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
    category: 'tea',
    inStock: true,
    stockQuantity: 100,
  },

  // Bakery
  {
    title: 'Croissant',
    productTitle: 'Croissant',
    description: 'Buttery and flaky French croissant, baked fresh daily',
    price: '$3.50',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500',
    category: 'bakery',
    inStock: true,
    stockQuantity: 50,
  },
  {
    title: 'Blueberry Muffin',
    productTitle: 'Blueberry Muffin',
    description: 'Moist muffin with fresh blueberries, perfect with coffee',
    price: '$3.75',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500',
    category: 'bakery',
    inStock: true,
    stockQuantity: 50,
  },
  {
    title: 'Chocolate Chip Cookie',
    productTitle: 'Chocolate Chip Cookie',
    description: 'Warm and chewy cookie with chocolate chips',
    price: '$2.50',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500',
    category: 'bakery',
    inStock: true,
    stockQuantity: 50,
  },
  {
    title: 'Bagel with Cream Cheese',
    productTitle: 'Bagel with Cream Cheese',
    description: 'Fresh bagel with creamy spread, classic breakfast',
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500',
    category: 'bakery',
    inStock: true,
    stockQuantity: 50,
  },

  // Beverages
  {
    title: 'Fresh Orange Juice',
    productTitle: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice, vitamin C boost',
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500',
    category: 'beverages',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Iced Tea',
    productTitle: 'Iced Tea',
    description: 'Refreshing iced tea, perfect for hot days',
    price: '$3.50',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
    category: 'beverages',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Lemonade',
    productTitle: 'Lemonade',
    description: 'Fresh lemonade, sweet and tangy',
    price: '$3.75',
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2fdc?w=500',
    category: 'beverages',
    inStock: true,
    stockQuantity: 100,
  },
  {
    title: 'Smoothie',
    productTitle: 'Smoothie',
    description: 'Mixed fruit smoothie, healthy and delicious',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1505252585461-04db3eb84607?w=500',
    category: 'beverages',
    inStock: true,
    stockQuantity: 100,
  },

  // Sandwiches
  {
    title: 'Grilled Chicken Sandwich',
    productTitle: 'Grilled Chicken Sandwich',
    description: 'Tender grilled chicken with fresh vegetables',
    price: '$8.50',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500',
    category: 'sandwich',
    inStock: true,
    stockQuantity: 30,
  },
  {
    title: 'Classic Burger',
    productTitle: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: '$9.00',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    category: 'sandwich',
    inStock: true,
    stockQuantity: 30,
  },
  {
    title: 'Veggie Wrap',
    productTitle: 'Veggie Wrap',
    description: 'Fresh vegetables wrapped in tortilla, healthy option',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500',
    category: 'sandwich',
    inStock: true,
    stockQuantity: 30,
  },
  {
    title: 'Turkey Club',
    productTitle: 'Turkey Club',
    description: 'Sliced turkey with bacon, lettuce, and tomato',
    price: '$8.75',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500',
    category: 'sandwich',
    inStock: true,
    stockQuantity: 30,
  },

  // Desserts
  {
    title: 'Chocolate Cake',
    productTitle: 'Chocolate Cake',
    description: 'Rich chocolate cake with frosting, decadent treat',
    price: '$6.50',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
    category: 'desserts',
    inStock: true,
    stockQuantity: 20,
  },
  {
    title: 'Cheesecake',
    productTitle: 'Cheesecake',
    description: 'Creamy cheesecake with berry topping',
    price: '$7.00',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500',
    category: 'desserts',
    inStock: true,
    stockQuantity: 20,
  },
  {
    title: 'Tiramisu',
    productTitle: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
    category: 'desserts',
    inStock: true,
    stockQuantity: 20,
  },
  {
    title: 'Ice Cream Sundae',
    productTitle: 'Ice Cream Sundae',
    description: 'Vanilla ice cream with chocolate sauce and toppings',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500',
    category: 'desserts',
    inStock: true,
    stockQuantity: 20,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert products
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
