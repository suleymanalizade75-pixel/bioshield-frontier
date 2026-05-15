import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import CatalogSection from '@/components/landing/CatalogSection';
import EfficacySection from '@/components/landing/EfficacySection';
import TechSection from '@/components/landing/TechSection';
import ComparisonTable from '@/components/landing/ComparisonTable';
import AdditivesSection from '@/components/landing/AdditivesSection';
import FeedSection from '@/components/landing/FeedSection';
import FormSection from '@/components/landing/FormSection';
import Footer from '@/components/landing/Footer';
import FAQSection from '@/components/landing/FAQSection';
import AIChatWidget from '@/components/landing/AIChatWidget';
import ProductSearchModal from '@/components/landing/ProductSearchModal';
import TechHUD from '@/components/landing/TechHUD';
import { useState } from 'react';

export default function Landing() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-inter">
      <TechHUD />
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <ProductSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <HeroSection />
      <CatalogSection />
      <ComparisonTable />
      <EfficacySection />
      <TechSection />
      <AdditivesSection />
      <FeedSection />
      <FormSection />
      <FAQSection />
      <Footer />
      <AIChatWidget />
    </div>
  );
}