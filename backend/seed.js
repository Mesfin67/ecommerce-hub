require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Define 21 dummy products
const products = [
  {
    name: "Smartphone",
    image: "https://m.media-amazon.com/images/I/61xk4XNRktL._AC_UY327_FMwebp_QL65_.jpg",
    price: 299.99,
    shortDescription: "A high-quality smartphone with modern features.",
    fullDescription: "This smartphone offers an excellent blend of performance and design, perfect for everyday use.",
    category: "electronics"
  },
  {
    name: "Laptop",
    image: "https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY327_FMwebp_QL65_.jpg",
    price: 799.99,
    shortDescription: "A high-powered laptop for work and play.",
    fullDescription: "With a sleek design and comprehensive features, this laptop is suited for both business and personal tasks.",
    category: "electronics"
  },
  {
    name: "T-Shirt",
    image: "https://m.media-amazon.com/images/I/71ISTYxoRgL._AC_UL480_FMwebp_QL65_.jpg",
    price: 19.99,
    shortDescription: "Comfortable cotton t-shirt available in multiple colors.",
    fullDescription: "A versatile and stylish cotton t-shirt, perfect for daily wear and available in various sizes and colors.",
    category: "clothing"
  },
  {
    name: "Novel",
    image: "https://m.media-amazon.com/images/I/91ihpkdpksL._AC_UL480_FMwebp_QL65_.jpg",
    price: 9.99,
    shortDescription: "A captivating novel to keep you engaged.",
    fullDescription: "Dive into this enchanting story filled with twists, drama, and unforgettable characters.",
    category: "books"
  },
  {
    name: "Headphones",
    image: "https://m.media-amazon.com/images/I/515FE+S4yLL._AC_UY327_FMwebp_QL65_.jpg",
    price: 49.99,
    shortDescription: "High-quality headphones with excellent sound quality.",
    fullDescription: "Experience immersive audio with these comfortable and stylish headphones designed for long listening sessions.",
    category: "electronics"
  },
  {
    name: "Smartwatch",
    image: "https://m.media-amazon.com/images/I/61CZSoSnVPL._AC_UY327_FMwebp_QL65_.jpg",
    price: 149.99,
    shortDescription: "A feature-packed smartwatch for everyday needs.",
    fullDescription: "Keep track of your fitness, notifications, and more with this sleek and modern smartwatch.",
    category: "electronics"
  },
  {
    name: "Tablet",
    image: "https://m.media-amazon.com/images/I/618mxQZWt1L._AC_UY327_FMwebp_QL65_.jpg",
    price: 399.99,
    shortDescription: "A versatile tablet suitable for work and entertainment.",
    fullDescription: "This tablet delivers great performance, high clarity display, and portability for work or leisure.",
    category: "electronics"
  },
  {
    name: "Camera",
    image: "https://m.media-amazon.com/images/I/71ZYxtmYkPL._AC_UY327_FMwebp_QL65_.jpg",
    price: 549.99,
    shortDescription: "Capture stunning photos with this powerful camera.",
    fullDescription: "With advanced features and high-resolution capabilities, this camera is perfect for both amateurs and professionals.",
    category: "electronics"
  },
  {
    name: "Printer",
    image: "https://m.media-amazon.com/images/I/61bKpCb+8BL._AC_UY327_FMwebp_QL65_.jpg",
    price: 129.99,
    shortDescription: "Efficient printer ideal for home and office use.",
    fullDescription: "This printer offers fast print speeds and high-quality output, making it indispensable in any office environment.",
    category: "electronics"
  },
  {
    name: "Monitor",
    image: "https://m.media-amazon.com/images/I/710HmaQgX3L._AC_UY327_FMwebp_QL65_.jpg",
    price: 199.99,
    shortDescription: "High-definition monitor for clear visuals.",
    fullDescription: "Enjoy vibrant colors and sharp details with this state-of-the-art monitor, perfect for gaming and professional work.",
    category: "electronics"
  },
  {
    name: "Keyboard",
    image: "https://m.media-amazon.com/images/I/61jhVTLFAEL._AC_UY327_FMwebp_QL65_.jpg",
    price: 39.99,
    shortDescription: "Responsive keyboard with ergonomic design.",
    fullDescription: "Designed for comfort and durability, this keyboard ensures smooth typing experiences for both work and play.",
    category: "electronics"
  },
  {
    name: "Mouse",
    image: "https://m.media-amazon.com/images/I/5181UFuvoBL._AC_UY327_FMwebp_QL65_.jpg",
    price: 29.99,
    shortDescription: "A responsive and comfortable computer mouse.",
    fullDescription: "This mouse is optimized for precision and ease of use, making it ideal for long hours at the computer.",
    category: "electronics"
  },
  {
    name: "Sunglasses",
    image: "https://m.media-amazon.com/images/I/71uj3g0flUL._AC_UL480_FMwebp_QL65_.jpg",
    price: 25.99,
    shortDescription: "Stylish sunglasses offering UV protection.",
    fullDescription: "These sunglasses blend fashion and function to protect your eyes with a trendy look.",
    category: "clothing"
  },
  {
    name: "Shoes",
    image: "https://m.media-amazon.com/images/I/610QT3kQ-gL._AC_UL480_FMwebp_QL65_.jpg",
    price: 59.99,
    shortDescription: "Comfortable and durable shoes for everyday wear.",
    fullDescription: "Step out in style with these shoes that combine comfort with a contemporary design.",
    category: "clothing"
  },
  {
    name: "Backpack",
    image: "https://m.media-amazon.com/images/I/61eiZt4fmaL._AC_UY327_FMwebp_QL65_.jpg",
    price: 45.99,
    shortDescription: "A versatile backpack for travel and daily commute.",
    fullDescription: "This backpack features multiple compartments and a sturdy design, perfect for carrying your essentials.",
    category: "clothing"
  },
  {
    name: "Coffee Maker",
    image: "https://m.media-amazon.com/images/I/61HzF-joRmL._AC_UL480_FMwebp_QL65_.jpg",
    price: 89.99,
    shortDescription: "Brew delicious coffee at home with ease.",
    fullDescription: "Enjoy your favorite brew any time with this user-friendly coffee maker, designed for consistent performance.",
    category: "home-appliances"
  },
  {
    name: "Blender",
    image: "https://m.media-amazon.com/images/I/71iD5RyhuaL._AC_UY327_FMwebp_QL65_.jpg",
    price: 59.99,
    shortDescription: "A powerful blender perfect for smoothies and soups.",
    fullDescription: "This blender offers high-speed performance to deliver smooth, delicious results quickly.",
    category: "home-appliances"
  },
  {
    name: "Microwave",
    image: "https://m.media-amazon.com/images/I/81gP22+jCVL._AC_UY327_FMwebp_QL65_.jpg",
    price: 99.99,
    shortDescription: "Efficient microwave for quick meals.",
    fullDescription: "A compact and efficient microwave designed to heat your meals evenly in minutes.",
    category: "home-appliances"
  },
  {
    name: "Refrigerator",
    image: "https://m.media-amazon.com/images/I/611+ApROVpL._AC_SX679_.jpg",
    price: 499.99,
    shortDescription: "Modern refrigerator with ample storage.",
    fullDescription: "Keep your food fresh and organized with this energy-efficient refrigerator that brings both style and functionality to your kitchen.",
    category: "home-appliances"
  },
  {
    name: "Air Conditioner",
    image: "https://m.media-amazon.com/images/I/61MoXpPpI7L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    price: 349.99,
    shortDescription: "Stay cool with this efficient air conditioner.",
    fullDescription: "This air conditioner offers quick cooling solutions and energy efficiency, perfect for hot summer days.",
    category: "home-appliances"
  },
  {
    name: "Desk Lamp",
    image: "https://m.media-amazon.com/images/I/61wOrELntLL._AC_SL1500_.jpg",
    price: 24.99,
    shortDescription: "A modern desk lamp with adjustable brightness.",
    fullDescription: "Enhance your workspace with this stylish desk lamp that provides optimal lighting for reading and working.",
    category: "home-appliances"
  }
];

// Connect to MongoDB using the connection string from .env
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB for seeding.");
    // Delete existing products (optional)
    return Product.deleteMany({});
  })
  .then(() => {
    // Insert dummy products
    return Product.insertMany(products);
  })
  .then((result) => {
    console.log("Dummy products inserted successfully!");
    console.log(result);
    process.exit();
  })
  .catch((error) => {
    console.error("Error seeding dummy data:", error);
    process.exit(1);
  });
