import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");

  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Updated logout handler to redirect to home page
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate("/"); // Redirect to the home page
  };

  const addToCart = (product) => {
    if (!user) {
      setNotification("Please signup or login to add items to your cart");
      setTimeout(() => {
        setNotification("");
      }, 3000);
      return;
    }
    setCartItems((prevCart) => {
      const index = prevCart.findIndex((item) => item._id === product._id);
      if (index > -1) {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setCartItems([]); // Clear the cart after purchase
      setNotification("Purchase successful! Thank you for your order.");
      setTimeout(() => setNotification(""), 3000);
    } else {
      setNotification("Your cart is empty.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogout={handleLogout}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
      <div className="container mt-4">
        {notification && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {notification}
            <button
              type="button"
              className="btn-close"
              onClick={() => setNotification("")}
            ></button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} onCheckout={handleCheckout} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
