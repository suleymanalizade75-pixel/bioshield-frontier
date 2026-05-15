import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Activity, Thermometer, Shield, Droplets,
  FlaskConical, Wind, Heart, ChevronRight
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import AromaxDryCattleModal from './AromaxDryCattleModal';
import MouldGuardDiamondModal from './MouldGuardDiamondModal';
import ToxiGuardModal from './ToxiGuardModal';
import TurboGrowModal from './TurboGrowModal';
import BacfloraBRModal from './BacfloraBRModal';

const getFeedCategoriesData = (lang) => [
  {
    key: 'feed-intake',
    label: 'Feed Intake',
    Icon: Activity,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: 'Palatability enhancers and appetite stimulants for improved consumption and feed efficiency in swine herds.',
    products: [{ name: 'Aromax® Dry', modal: 'aromax-dry' }],
  },
  {
    key: 'feed-quality',
    label: 'Feed Quality',
    Icon: Thermometer,
    color: '#f87171',
    glow: 'rgba(248,113,113,0.5)',
    desc: 'Quality assurance and nutrient bioavailability optimization for maximum performance metrics.',
    products: [{ name: 'Mould Guard Diamond', modal: 'mould-guard' }, { name: 'Toxi-Guard', modal: 'toxi-guard' }],
  },
  {
    key: 'gut-health',
    label: 'Gut Health',
    Icon: Activity,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: 'Microbiome balance, villi integrity and pathogen control for superior nutrient absorption and animal performance.',
    products: [{ name: 'Bacflora® BR', modal: 'bacflora-br' }, { name: 'Turbo Grow', modal: 'turbo-grow' }],
  },
  {
    key: 'nagp',
    label: 'NAGP',
    Icon: FlaskConical,
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.5)',
    desc: 'N-Acetyl Glucosamine Peptide complex for intestinal mucosal barrier reinforcement and gut integrity.',
    products: [{ name: 'Bacflora® BR', modal: 'bacflora-br' }, { name: 'Turbo Grow', modal: 'turbo-grow' }],
  },
  {
    key: 'respiratory',
    label: 'Respiratory System Support',
    Icon: Wind,
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.5)',
    desc: 'Mucolytic essential oils and bronchodilatory phytogenics for clear airway maintenance and respiratory health.',
    products: [{ name: 'Aromax® Dry', modal: 'aromax-dry' }],
  },
];

function CategoryCard({ cat, isHovered, onHover, onLeave, isLocked, onLock }) {
  const { Icon } = cat;
  const isActive = isHovered === cat.key || isLocked === cat.key;
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => onHover(cat.key)}
      onMouseLeave={onLeave}
      onClick={() => onLock(cat.key)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center cursor-pointer w-full"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${cat.color}28, ${cat.color}10)`
          : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${isActive ? cat.color : 'rgba(255,255,255,0.12)'}`,
        boxShadow: isActive
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
          boxShadow: isActive ? `0 0 14px ${cat.glow}` : `0 0 6px ${cat.glow}`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: cat.color, filter: `drop-shadow(0 0 4px ${cat.color})` }} />
      </div>
      <span className="font-orbitron text-[9px] font-bold tracking-wider text-white leading-tight">
        {cat.label}
      </span>
    </motion.button>
  );
}

export default function SwineFeedModal({ open, onClose }) {
  const { lang } = useLang();
  const FEED_CATEGORIES = getFeedCategoriesData(lang);
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [aromaxDryOpen, setAromaxDryOpen] = useState(false);
  const [mouldGuardOpen, setMouldGuardOpen] = useState(false);
  const [toxiGuardOpen, setToxiGuardOpen] = useState(false);
  const [turboGrowOpen, setTurboGrowOpen] = useState(false);
  const [bacfloraBROpen, setBacfloraBROpen] = useState(false);

  const handleProductClick = (modalKey) => {
    if (modalKey === 'aromax-dry') setAromaxDryOpen(true);
    if (modalKey === 'mould-guard') setMouldGuardOpen(true);
    if (modalKey === 'toxi-guard') setToxiGuardOpen(true);
    if (modalKey === 'turbo-grow') setTurboGrowOpen(true);
    if (modalKey === 'bacflora-br') setBacfloraBROpen(true);
  };

  const handleLock = (catKey) => {
    setLocked(locked === catKey ? null : catKey);
  };

  const handleClose = () => {
    setHovered(null);
    setLocked(null);
    onClose();
  };

  return (
    <>
    <AromaxDryCattleModal open={aromaxDryOpen} onClose={() => setAromaxDryOpen(false)} />
    <MouldGuardDiamondModal open={mouldGuardOpen} onClose={() => setMouldGuardOpen(false)} />
    <ToxiGuardModal open={toxiGuardOpen} onClose={() => setToxiGuardOpen(false)} />
    <TurboGrowModal open={turboGrowOpen} onClose={() => setTurboGrowOpen(false)} />
    <BacfloraBRModal open={bacfloraBROpen} onClose={() => setBacfloraBROpen(false)} />
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
              border: '1px solid rgba(88,112,26,0.3)',
              boxShadow: '0 0 60px rgba(88,112,26,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(88,112,26,0.18)',
                background: 'rgba(88,112,26,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(88,112,26,0.18)',
                    border: '1.5px solid rgba(88,112,26,0.45)',
                    boxShadow: '0 0 14px rgba(88,112,26,0.4)',
                  }}
                >
                  <Activity className="w-4 h-4" style={{ color: '#587012', filter: 'drop-shadow(0 0 5px #587012)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    SWINE · FEED
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(136,184,74,0.55)' }}>
                    5 NUTRITION CATEGORIES
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

              {/* Hint when nothing hovered/locked */}
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
                      ↑ HOVER A CATEGORY TO EXPLORE PRODUCTS
                    </span>
                  </motion.div>
                ) : hovered || locked ? (
                  /* Lower Solutions Panel */
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
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${activeCat.color}28, ${activeCat.color}0a)`,
                              border: `1.5px solid ${activeCat.color}55`,
                              boxShadow: `0 0 20px ${activeCat.glow}`,
                            }}
                          >
                            <activeCat.Icon className="w-7 h-7" style={{ color: activeCat.color, filter: `drop-shadow(0 0 8px ${activeCat.color})` }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-orbitron text-base font-bold text-white tracking-wider mb-2">
                              {activeCat.label}
                            </div>
                            <p className="font-inter text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
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
                        </div>
                      );
                    })()}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}