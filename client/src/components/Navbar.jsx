import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout, cartCount }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          DOT-Commerce
        </Link>
        <div className="d-flex">
          {user ? (
            <>
              <span className="navbar-text me-2 small">{user.email}</span>
              <Link to="/products" className="btn btn-outline-secondary btn-sm me-2">
                Products
              </Link>
              <Link to="/cart" className="btn btn-outline-secondary btn-sm me-2" title="View Cart">
                🛒
                {cartCount > 0 && <span className="badge bg-danger ms-1">{cartCount}</span>}
              </Link>
              <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm me-2">Login</Link>
              <Link to="/signup" className="btn btn-outline-success btn-sm">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
