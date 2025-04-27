const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  shortDescription: {
    type: String,
    default: 'This is a wonderful product that you will love to use every day. Explore its features in detail!'
  },
  fullDescription: { type: String },
  category: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);
