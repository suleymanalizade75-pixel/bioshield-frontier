import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Pill } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getFeedCategoriesData = (lang) => [
  {
    key: 'brood',
    label: 'Brood Production',
    color: '#C89010',
    glow: 'rgba(200,144,16,0.5)',
    desc: 'Protein supplement pollen substitute — stimulates brood production.',
    products: [
      { name: 'ColonyBoost', desc: 'Premium pollen replacement formula for enhanced brood rearing.' },
    ],
  },
  {
    key: 'winter',
    label: 'Winter Survival',
    color: '#C89010',
    glow: 'rgba(200,144,16,0.5)',
    desc: 'Fructose-glucose syrup with electrolytes for winter colony survival.',
    products: [
      { name: 'HiveEnergy', desc: 'Balanced energy formula to sustain colonies through winter months.' },
    ],
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
        <span className="text-lg">🐝</span>
      </div>
      <span className="font-orbitron text-[9px] font-bold tracking-wider text-white leading-tight">
        {cat.label}
      </span>
    </motion.button>
  );
}

export default function BeesFeedModal({ open, onClose }) {
  const { lang } = useLang();
  const FEED_CATEGORIES = getFeedCategoriesData(lang);
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);

  const handleLock = (catKey) => {
    setLocked(locked === catKey ? null : catKey);
  };

  const handleClose = () => {
    setHovered(null);
    setLocked(null);
    onClose();
  };

  return (
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
              border: '1px solid rgba(200,144,16,0.3)',
              boxShadow: '0 0 60px rgba(200,144,16,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(200,144,16,0.18)',
                background: 'rgba(200,144,16,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(200,144,16,0.18)',
                    border: '1.5px solid rgba(200,144,16,0.45)',
                    boxShadow: '0 0 14px rgba(200,144,16,0.4)',
                  }}
                >
                  <span className="text-lg">🐝</span>
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    BEES · FEED
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(200,144,16,0.55)' }}>
                    NUTRITION SOLUTIONS FOR HONEY & QUEEN BEES
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
                {FEED_CATEGORIES.map((cat) => (
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
                      background: `linear-gradient(135deg, ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).color}10, ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).color}04)`,
                      border: `1px solid ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).color}35`,
                      boxShadow: `0 0 30px ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).glow}`,
                    }}
                  >
                    {(() => {
                      const activeCat = FEED_CATEGORIES.find(c => c.key === (locked || hovered));
                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🐝</span>
                            <div className="font-orbitron text-lg font-bold text-white tracking-wider">
                              {activeCat.label}
                            </div>
                          </div>
                          <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {activeCat.desc}
                          </p>
                          {activeCat.products && (
                            <div className="flex flex-wrap gap-3">
                              {activeCat.products.map((prod) => (
                                <motion.div
                                  key={prod.name}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.97 }}
                                  className="flex items-start gap-2 rounded-xl px-4 py-3 flex-1 min-w-[240px]"
                                  style={{
                                    background: 'rgba(255,255,255,0.92)',
                                    border: `1px solid ${activeCat.color}40`,
                                    boxShadow: `0 2px 12px rgba(0,0,0,0.25), 0 0 8px ${activeCat.glow}`,
                                  }}
                                >
                                  <Pill className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: activeCat.color }} />
                                  <div className="flex-1">
                                    <div className="font-orbitron text-xs font-bold leading-tight text-gray-800">{prod.name}</div>
                                    <div className="font-inter text-[10px] leading-relaxed mt-1 text-gray-600">{prod.desc}</div>
                                  </div>
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
  );
}