import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BookOpen, Zap, ArrowLeft } from 'lucide-react';

const BRAND_COLOR = '#38bdf8';

const PRODUCTS = [
  {
    key: 'imperial',
    name: 'IMPERIAL Calf Milk Replacer',
    color: '#f59e0b',
    tagline: '100% Animal Protein · Premium Formulation',
    description: 'Formulated based on the nutritional needs of dairy calves, containing 100% animal protein. Can be consumed immediately after feeding with colostrum and transition milk. Delivers stable and unchanged composition for consistent calf development.',
    fortified: ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins'],
    ingredients: ['Skimmed milk powder', 'Whey powder', 'Whey protein concentrate (WPC)', 'Vegetable fats', 'Minerals and Vitamins', 'Feed additives'],
    analysis: [
      { nutrient: 'Crude Protein', value: '22 (min)', unit: '%' },
      { nutrient: 'Crude Fat', value: '17 (min)', unit: '%' },
      { nutrient: 'Crude Fiber', value: '0.1>', unit: '%' },
      { nutrient: 'Ash', value: '8', unit: '%' },
      { nutrient: 'Calcium', value: '0.9', unit: '%' },
      { nutrient: 'Phosphorus', value: '0.6', unit: '%' },
    ],
    benefits: ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission via cow milk', 'Time-saving and easy to use', 'More economic benefits'],
  },
  {
    key: 'unique',
    name: 'UNIQUE Calf Milk Replacer',
    color: '#34d399',
    tagline: 'Animal & Plant Protein Blend · Cost-Effective',
    description: 'Formulated based on the nutritional needs of dairy calves, containing some protein of plant origin. Can be consumed after the end of the third week. Includes hydrolyzed wheat gluten for improved digestibility and feed conversion.',
    fortified: ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins'],
    ingredients: ['Skimmed milk powder', 'Whey powder', 'Whey protein concentrate (WPC)', 'Hydrolyzed wheat gluten', 'Vegetable fats', 'Minerals and Vitamins', 'Feed additives'],
    analysis: [
      { nutrient: 'Crude Protein', value: '22 (min)', unit: '%' },
      { nutrient: 'Crude Fat', value: '17 (min)', unit: '%' },
      { nutrient: 'Crude Fiber', value: '0.3>', unit: '%' },
      { nutrient: 'Ash', value: '8', unit: '%' },
      { nutrient: 'Calcium', value: '0.9', unit: '%' },
      { nutrient: 'Phosphorus', value: '0.6', unit: '%' },
    ],
    benefits: ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission via cow milk', 'Time-saving and easy to use', 'More economic benefits'],
  },
  {
    key: 'milk-plus',
    name: 'Milk Plus',
    color: '#a78bfa',
    tagline: 'Enhancer of Milk Nutrients & Dry Matter',
    description: 'For milk enrichment and increasing its dry matter. Formulated to meet the exact nutrient needs of calves. Mix 10 grams of powder with 1 liter of milk.',
    fortified: ['Pre- & Probiotics', 'Water & Fat-Soluble Vitamins', 'Major & Trace Minerals'],
    ingredients: ['Water and Fat-soluble Vitamins', 'Major and trace minerals', 'Skimmed milk powder', 'Whey powder'],
    analysis: [
      { nutrient: 'Crude protein', value: '15', unit: '%' },
      { nutrient: 'Crude fat', value: '2', unit: '%' },
      { nutrient: 'Crude fiber', value: '0.1', unit: '%' },
      { nutrient: 'Ash', value: '11', unit: '%' },
      { nutrient: 'Calcium', value: '1', unit: '%' },
      { nutrient: 'Phosphorus', value: '0.5', unit: '%' },
      { nutrient: 'Vitamin A', value: '300,000', unit: 'IU/kg' },
      { nutrient: 'Vitamin D3', value: '250,000', unit: 'IU/kg' },
      { nutrient: 'Vitamin E', value: '20,000', unit: 'IU/kg' },
      { nutrient: 'Vitamin C', value: '2,500', unit: 'mg/kg' },
      { nutrient: 'Zinc', value: '150', unit: 'mg/kg' },
      { nutrient: 'Iron', value: '500', unit: 'mg/kg' },
    ],
    benefits: ['Fortified with pre- & probiotics for intestinal microflora', 'Great palatability and digestibility', 'Increasing ingested protein and fat', 'Shortening weaning time', 'Improving feed conversion ratio', 'Increasing weaning weight', 'Excellent solubility and stability', 'Increasing milk dry matter with the simplest way'],
  },
  {
    key: 'fresh-start',
    name: 'Fresh Start',
    color: '#f87171',
    tagline: 'Calcium-Energy Supplement Drink for Fresh Cows',
    description: 'A nutritious, palatable, water-soluble powder given as a drink to cows immediately after calving. Rehydrates the cow, replenishes lost mineral resources, and maintains normal blood calcium levels. Reduces the intensity of negative energy balance by stimulating dry matter intake after calving.',
    fortified: ['Calcium Carbonate', 'Rumen-Protected Choline', 'Saccharomyces cerevisiae', 'Glucose Precursors', 'Chelated Minerals'],
    ingredients: ['Disaccharide Sugar Compounds', 'Hydrolyzed Wheat Protein', 'Glucose Precursors', 'Potassium Carbonate', 'Sodium bicarbonate', 'Calcium Carbonate', 'Rumen-protected Choline', 'Chloride and Niacin', 'Chelated Minerals', 'Saccharomyces cerevisiae', 'Yeast cell wall', 'Natural flavorings'],
    analysis: [],
    benefits: [
      'Recovery of water and electrolytes after calving',
      'Stimulates dry matter intake to reduce negative energy balance',
      'Provides calcium with high bioavailability in the critical first hours after calving',
      'Supports strong onset of lactation with readily available sugars',
      'Reduces risk of metritis, retained placenta, and postpartum culling',
      'Pleasant taste encourages the cow to drink more water',
    ],
    usage: '1–1.5 kg per animal in 10 liters of warm water (40–45°C). Once dissolved, add 10 L cold water to reach 20 liters at 25–30°C. Give within 30 minutes of calving.',
  },
];

function ProductDetail({ product, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Sub-header */}
      <div className="flex items-center gap-3 px-6 py-3 flex-shrink-0"
        style={{ borderBottom: `1px solid ${product.color}22`, background: `${product.color}06` }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.5)' }}>
          <ArrowLeft className="w-3 h-3" /> BACK
        </button>
        <div className="font-orbitron text-sm font-bold" style={{ color: product.color }}>{product.name}</div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Tagline */}
        <p className="font-inter text-sm font-semibold" style={{ color: `${product.color}cc` }}>{product.tagline}</p>

        {/* Description */}
        <div className="rounded-xl p-4" style={{ background: `${product.color}0d`, border: `1px solid ${product.color}28` }}>
          <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{product.description}</p>
        </div>

        {/* Fortified */}
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: product.color }}>FORTIFIED WITH</p>
          <div className="flex flex-wrap gap-2">
            {product.fortified.map(f => (
              <span key={f} className="px-3 py-1 rounded-full text-xs font-inter"
                style={{ background: `${product.color}18`, color: `${product.color}cc`, border: `1px solid ${product.color}33` }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Analysis + Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.analysis.length > 0 && (
            <div>
              <p className="font-orbitron text-[10px] font-bold tracking-wide mb-2" style={{ color: product.color }}>GUARANTEED ANALYSIS</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${product.color}28` }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: `${product.color}18`, borderBottom: `1px solid ${product.color}28` }}>
                      <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: product.color }}>NUTRIENT</th>
                      <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: product.color }}>VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.analysis.map(({ nutrient, value, unit }, i) => (
                      <tr key={nutrient} style={{ borderBottom: i < product.analysis.length - 1 ? `1px solid ${product.color}10` : 'none', background: i % 2 === 0 ? `${product.color}06` : 'transparent' }}>
                        <td className="px-3 py-1.5 font-inter" style={{ color: 'rgba(255,255,255,0.7)' }}>{nutrient}</td>
                        <td className="px-3 py-1.5 text-right font-orbitron text-[10px] font-bold" style={{ color: product.color }}>{value} {unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <p className="font-orbitron text-[10px] font-bold tracking-wide mb-2" style={{ color: product.color }}>KEY BENEFITS</p>
            <div className="space-y-1.5">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg p-2"
                  style={{ background: `${product.color}0a`, border: `1px solid ${product.color}15` }}>
                  <Zap className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: product.color }} />
                  <span className="font-inter text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage if applicable */}
        {product.usage && (
          <div className="rounded-xl p-4" style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: '#34d399' }}>INSTRUCTIONS FOR USE</p>
            <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{product.usage}</p>
          </div>
        )}

        {/* Ingredients */}
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-1" style={{ color: `${product.color}88` }}>INGREDIENTS</p>
          <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {product.ingredients.join(', ')}.
          </p>
        </div>

        {/* Download */}
        <a href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/0dd9dfad6_Product_Foudeh.pdf"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all duration-200 hover:opacity-80"
          style={{ color: `${product.color}99` }}>
          <BookOpen className="w-3.5 h-3.5" />
          ↓ DOWNLOAD PRODUCT DATASHEET
        </a>
      </div>
    </motion.div>
  );
}

export default function CattleMilkReplacerModal({ open, onClose }) {
  const [selected, setSelected] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.88)' }}
          onClick={(e) => { if (e.target === e.currentTarget) { setSelected(null); onClose(); } }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(4,10,16,0.97) 0%, rgba(2,8,14,0.99) 100%)',
              border: `1px solid ${BRAND_COLOR}44`,
              boxShadow: `0 0 70px rgba(56,189,248,0.12), 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${BRAND_COLOR}22`, background: `${BRAND_COLOR}07` }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${BRAND_COLOR}28`, border: `1.5px solid ${BRAND_COLOR}55`, boxShadow: `0 0 14px rgba(56,189,248,0.4)` }}>
                  <span className="text-lg">🐄</span>
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">CATTLE MILK REPLACERS</div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${BRAND_COLOR}88` }}>
                    NOVIN ROSHD SHAHRAN FOUDEH · BOVINE NUTRITION
                  </div>
                </div>
              </div>
              <button onClick={() => { setSelected(null); onClose(); }}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {selected ? (
                <ProductDetail key="detail" product={selected} onBack={() => setSelected(null)} />
              ) : (
                <motion.div key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto p-6 space-y-3"
                >
                  <p className="font-inter text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Select a product to view full specifications, analysis, and datasheet.
                  </p>
                  {PRODUCTS.map((product, i) => (
                    <motion.div
                      key={product.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="group rounded-xl p-4 cursor-pointer transition-all duration-200"
                      style={{ background: `linear-gradient(135deg, ${product.color}0d, ${product.color}05)`, border: `1px solid ${product.color}28` }}
                      whileHover={{ scale: 1.015, boxShadow: `0 0 24px ${product.color}40`, borderColor: `${product.color}60` }}
                      onClick={() => setSelected(product)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${product.color}22`, border: `1px solid ${product.color}40`, boxShadow: `0 0 10px ${product.color}40` }}>
                          <ChevronRight className="w-4 h-4" style={{ color: product.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-orbitron text-sm font-bold mb-0.5" style={{ color: product.color }}>{product.name}</div>
                          <div className="font-mono text-[9px] tracking-widest mb-1" style={{ color: `${product.color}77` }}>{product.tagline}</div>
                          <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{product.description.slice(0, 120)}…</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}