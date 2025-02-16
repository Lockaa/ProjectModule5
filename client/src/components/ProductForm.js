// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const navigate = useNavigate();  // Updated from useHistory
  const { id } = useParams();  // Get product ID from URL if editing an existing product

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Edit product
      axios.put(`http://localhost:5000/products/${id}`, product)
        .then(response => {
          alert('Product updated successfully!');
          navigate('/');  // Updated from history.push
        })
        .catch(error => console.log('Error updating product:', error));
    } else {
      // Add new product
      axios.post('http://localhost:5000/products', product)
        .then(response => {
          alert('Product added successfully!');
          navigate('/');  // Updated from history.push
        })
        .catch(error => console.log('Error adding product:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;
