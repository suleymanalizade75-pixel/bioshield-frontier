import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronRight, Tag } from 'lucide-react';

const ALL_PRODUCTS = [
  // POULTRY · HEALTH
  { name: 'ImmunoFort AV', category: 'Health', species: 'Poultry', tags: ['immunity', 'vitamins', 'antibody'] },
  { name: 'ProGut Poultry', category: 'Health', species: 'Poultry', tags: ['gut', 'probiotic', 'salmonella'] },
  // POULTRY · FEED
  { name: 'Ovostrong®', category: 'Feed', species: 'Poultry', tags: ['egg', 'shell', 'production'] },
  { name: 'Aromax® Dry', category: 'Feed', species: 'Poultry', tags: ['feed intake', 'palatability', 'appetite', 'respiratory'] },
  { name: 'Mould Guard Diamond', category: 'Feed', species: 'Poultry', tags: ['mould', 'mycotoxin', 'feed quality'] },
  { name: 'Toxi-Guard', category: 'Feed', species: 'Poultry', tags: ['toxin', 'binder', 'feed quality'] },
  { name: 'Bacflora® BR', category: 'Feed', species: 'Poultry', tags: ['gut health', 'bacillus', 'probiotic'] },
  { name: 'Turbo Grow', category: 'Feed', species: 'Poultry', tags: ['gut health', 'growth', 'performance'] },
  // POULTRY · FORM
  { name: 'Cal D Phos®', category: 'Form', species: 'Poultry', tags: ['calcium', 'phosphorus', 'bones'] },
  { name: 'Smooth Pro', category: 'Form', species: 'Poultry', tags: ['pellet', 'quality', 'binder'] },
  { name: 'E-Hydrolyte + C Pro', category: 'Form', species: 'Poultry', tags: ['electrolyte', 'heat stress', 'hydration'] },
  { name: 'Turbo Fluid', category: 'Form', species: 'Poultry', tags: ['energy', 'stress', 'fluid'] },
  { name: 'Mineral Forte', category: 'Form', species: 'Poultry', tags: ['minerals', 'trace elements'] },
  { name: 'Vitamin E+Se', category: 'Form', species: 'Poultry', tags: ['vitamin e', 'selenium', 'antioxidant'] },
  { name: 'Vitamin AD3E', category: 'Form', species: 'Poultry', tags: ['vitamins', 'growth', 'reproduction'] },
  { name: 'FeatherShield', category: 'Form', species: 'Poultry', tags: ['feather', 'biotin', 'skin'] },
  { name: 'BoneForce-P', category: 'Form', species: 'Poultry', tags: ['bone', 'calcium', 'skeleton'] },
  // CATTLE · HEALTH
  { name: 'Early Care', category: 'Health', species: 'Cattle', tags: ['calf', 'colostrum', 'neonatal', 'immunity'] },
  { name: 'Fertility', category: 'Health', species: 'Cattle', tags: ['reproduction', 'conception', 'reproductive'] },
  { name: 'Gut Health (Cattle)', category: 'Health', species: 'Cattle', tags: ['gut', 'microbiome', 'intestine'] },
  { name: 'Immunity (Cattle)', category: 'Health', species: 'Cattle', tags: ['immune', 'antibody', 'vaccine'] },
  { name: 'Kidney Support', category: 'Health', species: 'Cattle', tags: ['kidney', 'uric acid', 'renal'] },
  { name: 'Liver Support', category: 'Health', species: 'Cattle', tags: ['liver', 'detox', 'hepato'] },
  { name: 'NAGP (Cattle)', category: 'Health', species: 'Cattle', tags: ['nagp', 'mucosal', 'barrier'] },
  { name: 'Quick Recovery', category: 'Health', species: 'Cattle', tags: ['recovery', 'post-disease', 'energy'] },
  { name: 'Respiratory Support (Cattle)', category: 'Health', species: 'Cattle', tags: ['respiratory', 'airway', 'broncho'] },
  { name: 'Skin Quality', category: 'Health', species: 'Cattle', tags: ['skin', 'biotin', 'zinc', 'hide'] },
  // CATTLE · FEED
  { name: 'Mould Guard Diamond (Cattle)', category: 'Feed', species: 'Cattle', tags: ['mould', 'mycotoxin', 'feed quality'] },
  { name: 'Toxi-Guard (Cattle)', category: 'Feed', species: 'Cattle', tags: ['toxin', 'binder', 'feed quality'] },
  { name: 'Turbo Grow (Cattle)', category: 'Feed', species: 'Cattle', tags: ['gut health', 'growth', 'performance'] },
  // SWINE · HEALTH
  { name: 'GutShield Porcine', category: 'Health', species: 'Swine', tags: ['gut', 'butyrate', 'epithelium'] },
  { name: 'BreathEasy Pro', category: 'Health', species: 'Swine', tags: ['respiratory', 'phytogenic', 'ammonia'] },
  // SWINE · FEED
  { name: 'Mould Guard Diamond (Swine)', category: 'Feed', species: 'Swine', tags: ['mould', 'mycotoxin', 'feed quality'] },
  { name: 'Toxi-Guard (Swine)', category: 'Feed', species: 'Swine', tags: ['toxin', 'binder', 'feed quality'] },
  { name: 'Turbo Grow (Swine)', category: 'Feed', species: 'Swine', tags: ['gut health', 'growth', 'performance'] },
  // AQUACULTURE
  { name: 'AquaImmune Pro', category: 'Health', species: 'Aquaculture', tags: ['immunity', 'beta-glucan', 'gill'] },
  { name: 'PondGuard AV', category: 'Health', species: 'Aquaculture', tags: ['vibrio', 'probiotic', 'pond'] },
  { name: 'AquaGrow Elite', category: 'Feed', species: 'Aquaculture', tags: ['growth', 'fcr', 'tilapia', 'salmon'] },
  { name: 'ShrimpVital', category: 'Feed', species: 'Aquaculture', tags: ['shrimp', 'astaxanthin', 'pigmentation'] },
  { name: 'ScaleMirror', category: 'Form', species: 'Aquaculture', tags: ['scale', 'selenium', 'flesh quality'] },
  { name: 'FinStrong', category: 'Form', species: 'Aquaculture', tags: ['fin', 'dha', 'phospholipid'] },
  // BEES
  { name: 'VarroaShield', category: 'Health', species: 'Bees', tags: ['varroa', 'mite', 'oxalic'] },
  { name: 'NosemaStop', category: 'Health', species: 'Bees', tags: ['nosema', 'colony', 'botanical'] },
  { name: 'ColonyBoost', category: 'Feed', species: 'Bees', tags: ['pollen', 'brood', 'protein'] },
  { name: 'HiveEnergy', category: 'Feed', species: 'Bees', tags: ['syrup', 'winter', 'electrolyte'] },
  { name: 'QueenElite', category: 'Form', species: 'Bees', tags: ['queen', 'royal jelly', 'laying'] },
  { name: 'PropoClear', category: 'Form', species: 'Bees', tags: ['propolis', 'antifungal', 'colony'] },
  // IMMUCELL
  { name: 'First Defense®', category: 'Vaccine', species: 'Cattle', tags: ['passive immunity', 'calf', 'rotavirus', 'coronavirus', 'e.coli'] },
  { name: 'Tri-Shield®', category: 'Vaccine', species: 'Cattle', tags: ['passive immunity', 'calf', 'rotavirus', 'expanded'] },
];

const SPECIES_COLORS = {
  Poultry:     { color: '#5A8C2A', bg: 'rgba(90,140,42,0.15)', border: 'rgba(90,140,42,0.4)' },
  Cattle:      { color: '#6B9E30', bg: 'rgba(107,158,48,0.15)', border: 'rgba(107,158,48,0.4)' },
  Swine:       { color: '#7FB553', bg: 'rgba(127,181,83,0.15)', border: 'rgba(127,181,83,0.4)' },
  Aquaculture: { color: '#1A82C0', bg: 'rgba(26,130,192,0.15)', border: 'rgba(26,130,192,0.4)' },
  Bees:        { color: '#C89010', bg: 'rgba(200,144,16,0.15)', border: 'rgba(200,144,16,0.4)' },
};

const CATEGORY_COLORS = {
  Health:  '#1a9952',
  Feed:    '#c0392b',
  Form:    '#1a4fc0',
  Vaccine: '#8b5cf6',
};

export default function ProductSearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const filtered = query.trim().length < 1
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.species.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q))
        );
      });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[600] flex items-start justify-center pt-20 px-4 pb-8"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(2,8,4,0.85)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden"
            style={{
              maxHeight: '75vh',
              background: 'linear-gradient(145deg, rgba(8,24,10,0.97) 0%, rgba(4,14,6,0.99) 100%)',
              border: '1px solid rgba(52,211,153,0.25)',
              boxShadow: '0 0 60px rgba(52,211,153,0.08), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Search className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(52,211,153,0.7)' }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, species, categories..."
                className="flex-1 bg-transparent font-inter text-base text-white placeholder-white/25 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/70 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center ml-1 transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Result count */}
            <div className="px-5 py-2 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="font-mono text-[9px] tracking-[3px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {filtered.length} PRODUCT{filtered.length !== 1 ? 'S' : ''} FOUND
              </span>
            </div>

            {/* Results list */}
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Search className="w-10 h-10" style={{ color: 'rgba(255,255,255,0.1)' }} />
                  <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No products match your search</p>
                </div>
              ) : (
                <div className="p-3 space-y-1.5">
                  {filtered.map((product, i) => {
                    const sc = SPECIES_COLORS[product.species] || SPECIES_COLORS.Poultry;
                    const catColor = CATEGORY_COLORS[product.category] || '#888';
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.015, duration: 0.2 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(52,211,153,0.06)';
                          e.currentTarget.style.borderColor = 'rgba(52,211,153,0.2)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                        }}
                      >
                        {/* Category dot */}
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: catColor, boxShadow: `0 0 6px ${catColor}` }}
                        />

                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <span className="font-orbitron text-xs font-bold text-white">{product.name}</span>
                        </div>

                        {/* Species badge */}
                        <div
                          className="px-2 py-0.5 rounded-md flex-shrink-0"
                          style={{ background: sc.bg, border: `1px solid ${sc.border}` }}
                        >
                          <span className="font-mono text-[9px] tracking-widest" style={{ color: sc.color }}>
                            {product.species.toUpperCase()}
                          </span>
                        </div>

                        {/* Category badge */}
                        <div
                          className="px-2 py-0.5 rounded-md flex-shrink-0"
                          style={{ background: `${catColor}18`, border: `1px solid ${catColor}40` }}
                        >
                          <span className="font-mono text-[9px] tracking-widest" style={{ color: catColor }}>
                            {product.category.toUpperCase()}
                          </span>
                        </div>

                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: '#34d399' }} />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div
              className="flex items-center gap-4 px-5 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)' }}>ESC</kbd>
                <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>to close</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                  <div key={cat} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    <span className="font-mono text-[8px] tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}