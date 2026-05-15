import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Search, ChevronDown, Sparkles, ArrowLeft } from 'lucide-react';
import { SPECIES_ILLUSTRATIONS } from '@/lib/illustrationData';
import { useLang } from '@/lib/i18n';
import ProductCard from '@/components/products/ProductCard';
import FilterPanel from '@/components/products/FilterPanel';
import AIAssistant from '@/components/products/AIAssistant';
import SpeciesShowcase from '@/components/products/SpeciesShowcase';
import PredictiveSearchBar from '@/components/products/PredictiveSearchBar';

const getCategoriesData = (lang) => [
  { id: 'Anti-inflammatory/Analgesic', label: `🔥 ${lang === 'EN' ? 'Anti-inflammatory' : lang === 'AZ' ? 'İltihabəleyhinə' : 'Противовоспалительное'}`, color: '#f87171', glow: 'rgba(248,113,113,0.3)' },
  { id: 'Anti-parasitic', label: `🦠 ${lang === 'EN' ? 'Antiparasitic' : lang === 'AZ' ? 'Antiparazitar' : 'Антипаразитарное'}`, color: '#34d399', glow: 'rgba(52,211,153,0.3)' },
  { id: 'Antibiotics', label: `💊 ${lang === 'EN' ? 'Antibiotics' : lang === 'AZ' ? 'Antibiotiklər' : 'Антибиотики'}`, color: '#38bdf8', glow: 'rgba(56,189,248,0.3)' },
  { id: 'Antiviral', label: `🛡️ ${lang === 'EN' ? 'Antiviral' : lang === 'AZ' ? 'Antiviral' : 'Антивирусное'}`, color: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
  { id: 'Nutritional supplement', label: `🥗 ${lang === 'EN' ? 'Nutritional Supplement' : lang === 'AZ' ? 'Qida Əlavəsi' : 'Пищевая Добавка'}`, color: '#fbbf24', glow: 'rgba(251,191,36,0.3)' },
  { id: 'Respiratory system', label: `💨 ${lang === 'EN' ? 'Respiratory System' : lang === 'AZ' ? 'Tənəffüs Sistemi' : 'Дыхательная Система'}`, color: '#06b6d4', glow: 'rgba(6,182,212,0.3)' },
  { id: 'Cardiovascular', label: `❤️ ${lang === 'EN' ? 'Cardiovascular' : lang === 'AZ' ? 'Ürək-Damar' : 'Сердечно-Сосудистое'}`, color: '#ec4899', glow: 'rgba(236,72,153,0.3)' },
  { id: 'Digestive/Gastrointestinal', label: `🍽️ ${lang === 'EN' ? 'Digestive System' : lang === 'AZ' ? 'Həzm Sistemi' : 'Пищеварительная Система'}`, color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  { id: 'Immune support', label: `⚔️ ${lang === 'EN' ? 'Immune Support' : lang === 'AZ' ? 'İmmun Dəstəyi' : 'Иммунная Поддержка'}`, color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
  { id: 'Vaccines', label: `💉 ${lang === 'EN' ? 'Vaccines' : lang === 'AZ' ? 'Peyvəndlər' : 'Вакцины'}`, color: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
  { id: 'Test kits & Devices', label: `🔧 ${lang === 'EN' ? 'Devices & Tests' : lang === 'AZ' ? 'Cihazlar & Testlər' : 'Приборы и Тесты'}`, color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)' },
  { id: 'Pet Supplements', label: `🐾 ${lang === 'EN' ? 'Pet Supplements' : lang === 'AZ' ? 'Ev Heyvanı Əlavəsi' : 'Добавки для Питомцев'}`, color: '#f97316', glow: 'rgba(249,115,22,0.3)' },
];

const getSpeciesData = (lang) => [
  { id: 'bovine', label: `🐄 ${lang === 'EN' ? 'Bovine' : lang === 'AZ' ? 'Qaramal' : 'КРС'}`, icon: '🐄' },
  { id: 'porcine', label: `🐷 ${lang === 'EN' ? 'Porcine' : lang === 'AZ' ? 'Donuz' : 'Свиньи'}`, icon: '🐷' },
  { id: 'ovine', label: `🐑 ${lang === 'EN' ? 'Ovine' : lang === 'AZ' ? 'Qoyun' : 'Овцы'}`, icon: '🐑' },
  { id: 'poultry', label: `🐔 ${lang === 'EN' ? 'Poultry' : lang === 'AZ' ? 'Quşçuluq' : 'Птица'}`, icon: '🐔' },
  { id: 'equine', label: `🐴 ${lang === 'EN' ? 'Equine' : lang === 'AZ' ? 'At' : 'Лошади'}`, icon: '🐴' },
  { id: 'caprine', label: `🐐 ${lang === 'EN' ? 'Caprine' : lang === 'AZ' ? 'Keçi' : 'Козы'}`, icon: '🐐' },
  { id: 'canine', label: `🐕 ${lang === 'EN' ? 'Canine' : lang === 'AZ' ? 'İt' : 'Собаки'}`, icon: '🐕' },
  { id: 'feline', label: `🐈 ${lang === 'EN' ? 'Feline' : lang === 'AZ' ? 'Pişik' : 'Кошки'}`, icon: '🐈' },
  { id: 'aquaculture', label: `🐠 ${lang === 'EN' ? 'Aquaculture' : lang === 'AZ' ? 'Akvakultura' : 'Аквакультура'}`, icon: '🐠' },
  { id: 'bees', label: `🐝 ${lang === 'EN' ? 'Bees' : lang === 'AZ' ? 'Arılar' : 'Пчёлы'}`, icon: '🐝' },
];

export default function ProductsCatalog() {
   const navigate = useNavigate();
   const { lang, t } = useLang();
   const CATEGORIES = getCategoriesData(lang);
   const SPECIES = getSpeciesData(lang);
   const [filters, setFilters] = useState({
      category: '',
      species: [],
      dosageForm: '',
      search: ''
    });
    const [showAI, setShowAI] = useState(false);

   const { data: products = [] } = useQuery({
     queryKey: ['products'],
     queryFn: () => base44.entities.Product.list(),
   });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filtering - exact case-insensitive match
      const matchCategory = !filters.category || 
        (p.category && p.category.toLowerCase() === filters.category.toLowerCase());

      // Species filtering - check if selected species exist in product species array
      const matchSpecies = filters.species.length === 0 || 
        (p.species && Array.isArray(p.species) && 
         filters.species.some(selectedSpecies => 
           p.species.some(productSpecies => 
             productSpecies.toLowerCase() === selectedSpecies.toLowerCase()
           )
         )
        );

      // Dosage form filtering
      const matchDosage = !filters.dosageForm || p.dosage_form === filters.dosageForm;

      // Search filtering across name, description, and tags
      const matchSearch = !filters.search || 
        p.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(filters.search.toLowerCase())));

      // AND LOGIC: All active filters must match (returns true if filter not set)
      return matchCategory && matchSpecies && matchDosage && matchSearch;
    });
  }, [products, filters]);

  const categoryMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header with Hero Background */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-primary/10 bg-background/80"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Back Button and Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="p-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all flex items-center gap-2"
                title="Əsas səhifəyə qayıt"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline font-orbitron text-sm font-bold">{t.buttons.back}</span>
              </motion.button>
              <div>
                <h1 className="font-orbitron text-4xl font-bold text-foreground flex items-center gap-3">
                  <span className="text-3xl">🏥</span> {t.catalog_page.title}
                </h1>
                <p className="text-muted-foreground mt-2">{t.catalog_page.subtitle}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAI(!showAI)}
              className="px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-orbitron text-sm font-bold flex items-center gap-2 hover:bg-primary/20 transition-all"
              >
              <Sparkles className="w-4 h-4" /> {t.catalog_page.aiAssistant}
              </motion.button>
          </div>

          {/* Search Bar with Predictions */}
          <PredictiveSearchBar
            products={products}
            placeholder={t.catalog_page.searchPlaceholder}
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            onSelect={(product) => setFilters({...filters, search: product.name})}
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Species Illustration Showcase */}
        <SpeciesShowcase />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 lg:h-fit"
          >
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              categories={CATEGORIES}
              species={SPECIES}
            />
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground mb-4 font-orbitron">
                    {filteredProducts.length} {t.catalog_page.productsFound}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 rounded-2xl bg-card/50 border border-primary/10"
                >
                  <span className="text-6xl mb-4">🔍</span>
                  <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">{t.catalog_page.noProducts}</h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                   {t.catalog_page.noProductsDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAI && (
          <AIAssistant
            onClose={() => setShowAI(false)}
            products={products}
          />
        )}
      </AnimatePresence>
    </div>
  );
}