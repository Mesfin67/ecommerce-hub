import React from 'react';
import Products from './Products';

const Home = ({ addToCart }) => {
  return (
    <div className="text-center">
      <h1>Welcome to DOT-Commerce Hub</h1>
      <p>Discover our featured products and enjoy your shopping experience!</p>
      {/* Display the products list on the home page */}
      <Products addToCart={addToCart} />
    </div>
  );
};

export default Home;
