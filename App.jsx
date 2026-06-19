import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// страницы
import Landing from './pages/Landing.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import ProductsCatalog from './pages/ProductsCatalog.jsx';
import ProductImport from './pages/ProductImport.jsx';
import VaccineCompare from './pages/VaccineCompare.jsx';

// вспомогательные
import PageNotFound from './lib/PageNotFound.jsx';
import './i18n.jsx';


const PublicApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/product" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<ProductsCatalog />} />
      <Route path="/compare" element={<VaccineCompare />} />
      <Route path="/admin/import" element={<ProductImport />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <LangProvider>
      <Router>
        <PublicApp />
      </Router>
    </LangProvider>
  );
}

export default App;
