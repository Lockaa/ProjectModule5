// src/App.js

import React from 'react';
import {BrowserRouter as Routes, Route} from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  return (
    <Routes>
      <div>
          <Route path="/" exact component={ProductList} />
          <Route path="/add" component={ProductForm} />
          <Route path="/edit/:id" component={ProductForm} />
      </div>
    </Routes>
  );
};

export default App;
