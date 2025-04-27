import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [sort, category]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://ecommerce-hub-backend.onrender.com/api/products');
      let data = res.data;
      if (category) {
        data = data.filter((prod) => prod.category === category);
      }
      if (sort === 'price_low_high') {
        data.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_high_low') {
        data.sort((a, b) => b.price - a.price);
      }
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Products</h2>
      <div className="mb-3 d-flex">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select form-select-sm me-2"
          style={{ width: 'auto' }}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home-appliances">Home Appliances</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="form-select form-select-sm"
          style={{ width: 'auto' }}
        >
          <option value="">Sort By</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
        </select>
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100">
              {product.image && (
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  ${product.price}
                </h6>
                <p className="card-text">
                  {product.shortDescription ||
                    'This is a wonderful product. Explore its features in detail!'}
                </p>
                <Link
                  to={`/products/${product._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-warning btn-sm ms-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
