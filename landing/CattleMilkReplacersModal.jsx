import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Download, CheckCircle } from 'lucide-react';

const COLOR = '#6B9E30';
const DATASHEET_URL = 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/0dd9dfad6_Product_Foudeh.pdf';

// ─── Product detail data ───────────────────────────────────────────────────
const PRODUCTS = [
  {
    key: 'imperial',
    name: 'IMPERIAL Calf Milk Replacer',
    tagColor: '#d4a017',
    tagline: '100% Animal Protein · For Dairy Calves',
    desc: 'Formulated based on the nutritional needs of dairy calves, containing 100% animal protein. Can be consumed immediately after feeding with colostrum and transition milk.',
    fortified: ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins'],
    ingredients: 'Skimmed milk powder, whey powder, whey protein concentrate (WPC), vegetable fats, minerals and vitamins, feed additives',
    nutrients: [
      { name: 'Crude Protein', value: '22 (min)', unit: '%' },
      { name: 'Crude Fat', value: '17 (min)', unit: '%' },
      { name: 'Crude Fiber', value: '0.1>', unit: '%' },
      { name: 'Ash', value: '8', unit: '%' },
      { name: 'Calcium', value: '0.9', unit: '%' },
      { name: 'Phosphorus', value: '0.6', unit: '%' },
    ],
    benefits: ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission via cow milk', 'Time-saving and easy to use', 'More economic benefits'],
  },
  {
    key: 'unique',
    name: 'UNIQUE Calf Milk Replacer',
    tagColor: '#2e8b57',
    tagline: 'Mixed Protein · Suitable from Week 3+',
    desc: 'Formulated based on the nutritional needs of dairy calves, containing some protein of plant origin (hydrolyzed wheat gluten). Can be consumed after the end of the third week.',
    fortified: ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins'],
    ingredients: 'Skimmed milk powder, whey powder, whey protein concentrate (WPC), hydrolyzed wheat gluten, vegetable fats, minerals and vitamins, feed additives',
    nutrients: [
      { name: 'Crude Protein', value: '22 (min)', unit: '%' },
      { name: 'Crude Fat', value: '17 (min)', unit: '%' },
      { name: 'Crude Fiber', value: '0.3>', unit: '%' },
      { name: 'Ash', value: '8', unit: '%' },
      { name: 'Calcium', value: '0.9', unit: '%' },
      { name: 'Phosphorus', value: '0.6', unit: '%' },
    ],
    benefits: ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission', 'Time-saving and easy to use', 'More economic benefits'],
  },
  {
    key: 'freshstart',
    name: 'Fresh Start — Calcium-Energy Supplement',
    tagColor: '#e74c3c',
    tagline: 'For Fresh Cows · Immediately After Calving',
    desc: 'A nutritious, palatable, water-soluble powder given as a drink to cows immediately after calving. Rehydrates, replenishes lost minerals, and maintains normal blood calcium. Reduces negative energy balance by stimulating dry matter intake after calving.',
    fortified: [],
    ingredients: 'Disaccharide Sugar Compounds, Hydrolyzed Wheat Protein, Glucose Precursors, Potassium Carbonate, Sodium Bicarbonate, Calcium Carbonate, Rumen-protected Choline, Chloride and Niacin, Chelated Minerals, Saccharomyces cerevisiae, Yeast cell wall, natural flavorings',
    nutrients: [],
    benefits: [
      'Recovers water and electrolytes lost during calving',
      'Increases dry matter intake and stimulates strong onset of lactation',
      'Provides calcium with high bioavailability in first hours post-calving',
      'Reduces risk of metritis (14% vs 18% in control)',
      'Reduces retained placenta incidence (7.9% vs 10.1%)',
      'Reduces post-partum culling (4.1% vs 6.8%)',
    ],
    instructions: [
      'Add 1–1.5 kg Fresh Start to 10 liters of warm water (40–45 °C) and mix thoroughly.',
      'Once dissolved, add 10 L of cold water to reach 20 liters at 25–30 °C.',
      'Give to the cow within 30 minutes of calving and before full access to water.',
    ],
  },
  {
    key: 'milkplus',
    name: 'Milk Plus — Milk Nutrient Enhancer',
    tagColor: '#27ae60',
    tagline: 'Enhancer of Milk Nutrients & Dry Matter',
    desc: 'For milk enrichment and increasing its dry matter. Formulated to meet the exact nutrient needs of calves. Mix 10 grams of powder with 1 liter of milk.',
    fortified: ['Pre- & Probiotics', 'Water & Fat-Soluble Vitamins', 'Major & Trace Minerals'],
    ingredients: 'Water and Fat-soluble Vitamins, major and trace minerals, Skimmed milk powder, Whey powder',
    nutrients: [
      { name: 'Crude Protein', value: '15', unit: '%' },
      { name: 'Crude Fat', value: '2', unit: '%' },
      { name: 'Crude Fiber', value: '0.1', unit: '%' },
      { name: 'Ash', value: '11', unit: '%' },
      { name: 'Calcium', value: '1', unit: '%' },
      { name: 'Phosphorus', value: '0.5', unit: '%' },
      { name: 'Vitamin A', value: '300,000', unit: 'IU/kg' },
      { name: 'Vitamin D3', value: '250,000', unit: 'IU/kg' },
      { name: 'Vitamin E', value: '20,000', unit: 'IU/kg' },
      { name: 'Vitamin C', value: '2,500', unit: 'mg/kg' },
      { name: 'Ferrous', value: '500', unit: 'mg/kg' },
      { name: 'Zinc', value: '150', unit: 'mg/kg' },
    ],
    benefits: [
      'Fortified with pre- & probiotics improving intestinal microflora',
      'Great palatability and digestibility',
      'Increasing ingested protein and fat',
      'Shortening weaning time',
      'Improving feed conversion ratio',
      'Increasing weaning weight',
      'Excellent solubility and stability',
      'Increasing milk dry matter with the simplest way',
    ],
  },
  {
    key: 'novinbinder',
    name: 'Novin Binder — Mycotoxin Binder',
    tagColor: '#2980b9',
    tagline: 'Broad-spectrum Multi-component Detoxifier · Patented',
    desc: 'A broad-spectrum multi-component detoxifier supplement consisting of 5 active components with at least 3 detoxification mechanisms. Introduced by Novin Roshd Shahran Foudeh in 2019 — result of 7-year joint research. Official license from Iran Veterinary Organization (Patent No. 95355).',
    fortified: [],
    ingredients: 'Medicinal plants (flavonolignans, phenolic terpenes, flavonoids, phenolic acid, caffeic acids), Yeast and yeast cell wall, Thermal and acid-activated bentonite, Sodium Humate (fulvic acid, humic acid, complex organic compounds), Diatomite',
    nutrients: [
      { name: 'Low contamination', value: '1 kg', unit: '/ton' },
      { name: 'Moderate contamination', value: '2 kg', unit: '/ton' },
      { name: 'Severe contamination', value: '3 kg', unit: '/ton' },
    ],
    nutrientsLabel: 'RECOMMENDED DOSE',
    benefits: [
      '5 active components with various modes of action — reduces mycotoxin risk',
      'Immune system booster with antioxidant & anti-inflammatory properties',
      'Strong absorber of mycotoxins (8000:1 ratio)',
      'Strong decomposer of mycotoxins within 12 hours',
      'No significant effect on absorption of vitamins, minerals and antibiotics',
      'Improves feed efficiency and increases livestock performance',
      'Proven to clear AFB1, OTA, ZEA, and DON mycotoxins',
    ],
  },
];

// ─── Single product detail view ────────────────────────────────────────────
function ProductDetail({ product, onBack }) {
  const c = product.tagColor;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="flex-1 overflow-y-auto p-6 space-y-5"
    >
      <button onClick={onBack}
        className="flex items-center gap-1 font-mono text-[9px] tracking-[2px] transition-colors mb-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'white'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
        ← BACK
      </button>

      <div>
        <h3 className="font-orbitron text-base font-bold" style={{ color: c }}>{product.name}</h3>
        <p className="font-mono text-[9px] tracking-[2px] mt-0.5" style={{ color: `${c}88` }}>{product.tagline}</p>
      </div>

      {/* Description */}
      <div className="rounded-xl p-4" style={{ background: `${c}0d`, border: `1px solid ${c}28` }}>
        <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{product.desc}</p>
      </div>

      {/* Fortified */}
      {product.fortified.length > 0 && (
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>FORTIFIED WITH</p>
          <div className="flex flex-wrap gap-2">
            {product.fortified.map(f => (
              <span key={f} className="font-inter text-[10px] px-2.5 py-1 rounded-lg" style={{ background: `${c}18`, color: `${c}dd`, border: `1px solid ${c}30` }}>{f}</span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nutrients */}
        {product.nutrients.length > 0 && (
          <div>
            <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>{product.nutrientsLabel || 'GUARANTEED ANALYSIS'}</p>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${c}28` }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: `${c}18` }}>
                    <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: c }}>NUTRIENT</th>
                    <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: c }}>VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {product.nutrients.map(({ name, value, unit }, i) => (
                    <tr key={name} style={{ background: i % 2 === 0 ? `${c}06` : 'transparent', borderTop: `1px solid ${c}10` }}>
                      <td className="px-3 py-1.5 font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{name}</td>
                      <td className="px-3 py-1.5 text-right font-bold font-orbitron text-[10px]" style={{ color: c }}>{value} <span className="font-normal text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{unit}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>KEY BENEFITS</p>
          <div className="space-y-1.5">
            {product.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: c }} />
                <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions (Fresh Start) */}
      {product.instructions && (
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>INSTRUCTIONS FOR USE</p>
          <div className="space-y-1.5">
            {product.instructions.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-orbitron text-[10px] font-bold flex-shrink-0" style={{ color: c }}>{i + 1}.</span>
                <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients */}
      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c}20` }}>
        <p className="font-orbitron text-[9px] font-bold mb-1" style={{ color: c }}>INGREDIENTS</p>
        <p className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{product.ingredients}</p>
      </div>

      {/* Download */}
      <a href={DATASHEET_URL} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all hover:opacity-80"
        style={{ color: `${c}99` }}>
        <Download className="w-3 h-3" /> DOWNLOAD FULL DATASHEET (PDF)
      </a>
    </motion.div>
  );
}

// ─── Main Modal ─────────────────────────────────────────────────────────────
export default function CattleMilkReplacersModal({ open, onClose }) {
  const [selected, setSelected] = useState(null);

  const handleClose = () => { setSelected(null); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.88)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(6,10,4,0.97) 0%, rgba(4,7,2,0.99) 100%)',
              border: `1px solid ${COLOR}55`,
              boxShadow: `0 0 70px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}>
              <div>
                <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">MILK REPLACERS & SUPPLEMENTS</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>CATTLE · NOVIN ROSHD SHAHRAN FOUDEH</div>
              </div>
              <button onClick={handleClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {selected ? (
                <ProductDetail key={selected.key} product={selected} onBack={() => setSelected(null)} />
              ) : (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto p-6 space-y-3">
                  {PRODUCTS.map((product, i) => (
                    <motion.div
                      key={product.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-xl p-4 cursor-pointer"
                      style={{ background: `${product.tagColor}0d`, border: `1px solid ${product.tagColor}28` }}
                      whileHover={{ scale: 1.015, boxShadow: `0 0 24px ${product.tagColor}44`, borderColor: `${product.tagColor}60` }}
                      onClick={() => setSelected(product)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${product.tagColor}22`, border: `1px solid ${product.tagColor}40` }}>
                          <ChevronRight className="w-4 h-4" style={{ color: product.tagColor }} />
                        </div>
                        <div>
                          <div className="font-orbitron text-sm font-bold mb-0.5" style={{ color: product.tagColor }}>{product.name}</div>
                          <div className="font-mono text-[9px] tracking-[2px] mb-1" style={{ color: `${product.tagColor}88` }}>{product.tagline}</div>
                          <p className="font-inter text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{product.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="pt-2">
                    <a href={DATASHEET_URL} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all hover:opacity-80"
                      style={{ color: `${COLOR}77` }}>
                      <Download className="w-3 h-3" /> DOWNLOAD FULL PRODUCT BROCHURE (PDF)
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}