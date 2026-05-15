import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Pill } from 'lucide-react';
import SmoothProModal from './SmoothProModal';
import GlobioticModal from './GlobioticModal';
import TurboFluidModal from './TurboFluidModal';
import VitaminAD3EModal from './VitaminAD3EModal';

const FORM_CATEGORIES = [
  {
    key: 'muscle',
    label: 'Muscle Development',
    color: '#6B9E30',
    glow: 'rgba(107,158,48,0.5)',
    desc: 'Creatine & branched-chain AAs for superior beef muscle deposition.',
    products: [
      { name: 'MuscleMass-B', desc: 'Premium formula for enhanced muscle protein synthesis and deposition.' },
    ],
  },
  {
    key: 'coat',
    label: 'Coat & Hide Quality',
    color: '#6B9E30',
    glow: 'rgba(107,158,48,0.5)',
    desc: 'Omega-3 & selenium complex for glossy hide and skin health.',
    products: [
      { name: 'CoatLuster', desc: 'Advanced formulation for superior hide appearance and skin integrity.' },
    ],
  },
  {
    key: 'carcass-quality',
    label: 'Carcass Quality',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    desc: 'Targeted compounds for lean meat percentage improvement and superior carcass grading.',
    products: [{ name: 'Smooth Pro', modal: 'smooth-pro' }],
  },
  {
    key: 'early-care',
    label: 'Early Care',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: 'Colostrum support & neonatal immunity for optimal calf development and survival.',
    products: [{ name: 'Globiotic', modal: 'globiotic' }],
  },
  {
    key: 'heat-stress',
    label: 'Heat Stress',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    desc: 'Electrolyte & antioxidant support for thermoregulation during high-temperature periods.',
    products: [{ name: 'Turbo Fluid', modal: 'turbo-fluid' }],
  },
  {
    key: 'vitamin-mineral-amino',
    label: 'Vitamin/Mineral/Amino Acids',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.5)',
    desc: 'Balanced micronutrient & amino acid profile for metabolic optimization and peak performance.',
    products: [{ name: 'Turbo Fluid', modal: 'turbo-fluid' }, { name: 'Vitamin AD3E', modal: 'vitamin-ad3e' }],
  },
];

function CategoryCard({ cat, isHovered, onHover, onLeave, isLocked, onLock }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => onHover(cat.key)}
      onMouseLeave={onLeave}
      onClick={() => onLock(cat.key)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center cursor-pointer w-full"
      style={{
        background: isHovered === cat.key || isLocked === cat.key
          ? `linear-gradient(135deg, ${cat.color}28, ${cat.color}10)`
          : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${isHovered === cat.key || isLocked === cat.key ? cat.color : 'rgba(255,255,255,0.12)'}`,
        boxShadow: isHovered === cat.key || isLocked === cat.key
          ? `0 0 20px ${cat.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 2px 8px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}08)`,
          border: `1px solid ${cat.color}45`,
          boxShadow: isHovered === cat.key || isLocked === cat.key ? `0 0 14px ${cat.glow}` : `0 0 6px ${cat.glow}`,
        }}
      >
        <span className="text-lg">🐄</span>
      </div>
      <span className="font-orbitron text-[9px] font-bold tracking-wider text-white leading-tight">
        {cat.label}
      </span>
    </motion.button>
  );
}

export default function CattleFormModal({ open, onClose }) {
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [smoothProOpen, setSmoothProOpen] = useState(false);
  const [globioticOpen, setGlobioticOpen] = useState(false);
  const [turboFluidOpen, setTurboFluidOpen] = useState(false);
  const [vitaminAD3EOpen, setVitaminAD3EOpen] = useState(false);

  const handleLock = (catKey) => {
    setLocked(locked === catKey ? null : catKey);
  };

  const handleProductClick = (modalKey) => {
    if (modalKey === 'smooth-pro') setSmoothProOpen(true);
    if (modalKey === 'globiotic') setGlobioticOpen(true);
    if (modalKey === 'turbo-fluid') setTurboFluidOpen(true);
    if (modalKey === 'vitamin-ad3e') setVitaminAD3EOpen(true);
  };

  const handleClose = () => {
    setHovered(null);
    setLocked(null);
    onClose();
  };

  return (
    <>
    <SmoothProModal open={smoothProOpen} onClose={() => setSmoothProOpen(false)} />
    <GlobioticModal open={globioticOpen} onClose={() => setGlobioticOpen(false)} />
    <TurboFluidModal open={turboFluidOpen} onClose={() => setTurboFluidOpen(false)} />
    <VitaminAD3EModal open={vitaminAD3EOpen} onClose={() => setVitaminAD3EOpen(false)} />
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(2,12,4,0.80)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(8,28,12,0.95) 0%, rgba(5,18,8,0.98) 100%)',
              border: '1px solid rgba(107,158,48,0.3)',
              boxShadow: '0 0 60px rgba(107,158,48,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(107,158,48,0.18)',
                background: 'rgba(107,158,48,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(107,158,48,0.18)',
                    border: '1.5px solid rgba(107,158,48,0.45)',
                    boxShadow: '0 0 14px rgba(107,158,48,0.4)',
                  }}
                >
                  <span className="text-lg">🐄</span>
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    CATTLE · FARM
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(107,158,48,0.55)' }}>
                    6 FARM CATEGORIES
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Category grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
                {FORM_CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.key}
                    cat={cat}
                    isHovered={hovered}
                    onHover={setHovered}
                    onLeave={() => setHovered(null)}
                    isLocked={locked}
                    onLock={handleLock}
                  />
                ))}
              </div>

              {/* Solutions Panel */}
              <AnimatePresence mode="wait">
                {!hovered && !locked ? (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-3"
                  >
                    <span className="font-mono text-[10px] tracking-[4px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      ↑ SELECT A CATEGORY TO VIEW PRODUCTS
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={locked || hovered}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl p-5"
                    style={{
                      background: `linear-gradient(135deg, ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).color}10, ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).color}04)`,
                      border: `1px solid ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).color}35`,
                      boxShadow: `0 0 30px ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).glow}`,
                    }}
                  >
                    {(() => {
                      const activeCat = FORM_CATEGORIES.find(c => c.key === (locked || hovered));
                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🐄</span>
                            <div className="font-orbitron text-lg font-bold text-white tracking-wider">
                              {activeCat.label}
                            </div>
                          </div>
                          <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {activeCat.desc}
                          </p>
                          {activeCat.products && activeCat.products.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {activeCat.products.map((p) => (
                                <motion.div
                                  key={p.name}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleProductClick(p.modal)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer"
                                  style={{
                                    background: `linear-gradient(135deg, ${activeCat.color}20, ${activeCat.color}08)`,
                                    border: `1px solid ${activeCat.color}45`,
                                    boxShadow: `0 0 8px ${activeCat.glow}`,
                                  }}
                                >
                                  <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: activeCat.color }} />
                                  <span className="font-orbitron text-[10px] font-bold tracking-widest whitespace-nowrap" style={{ color: activeCat.color }}>
                                    {p.name}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}