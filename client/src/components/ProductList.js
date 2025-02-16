// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the back-end when the component mounts
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.log('Error fetching products:', error));
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
