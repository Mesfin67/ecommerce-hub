import React from 'react';

const Cart = ({ cartItems, removeFromCart, onCheckout }) => {
  // Calculate the total price by summing price * quantity for each item.
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between border p-2 mb-2"
            >
              <div>
                <strong>{item.name}</strong>
                <br />
                <span>Qty: {item.quantity}</span>
              </div>
              <div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => removeFromCart(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <h4>Total: ${total.toFixed(2)}</h4>
          {/* Buy Now button */}
          <button className="btn btn-success btn-sm" onClick={onCheckout}>
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
