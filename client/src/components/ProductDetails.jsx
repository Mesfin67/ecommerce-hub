import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://ecommerce-hub-backend.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="card mb-4">
      {product.image && (
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: '400px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <h4>${product.price}</h4>
        <p>{product.fullDescription || product.shortDescription}</p>
        <button
          onClick={() => addToCart(product)}
          className="btn btn-warning btn-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
