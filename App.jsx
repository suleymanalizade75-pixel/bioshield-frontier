import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { LangProvider } from './i18n';
import Landing from '@/pages/Landing';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import ProductsCatalog from '@/pages/ProductsCatalog';
import ProductImport from '@/pages/ProductImport';
import VaccineCompare from '@/pages/VaccineCompare';

const PublicApp = () => {
  // Render the main app with no authentication required
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
  )
}

export default App
