import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ecommerce-hub-backend.onrender.com/api/auth/signup', {
        email,
        password
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message || 'Signup failed');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={onSubmit} className="w-50 border p-4 mt-4 rounded">
        <h2 className="text-center mb-4">Signup</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success btn-sm w-100">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
