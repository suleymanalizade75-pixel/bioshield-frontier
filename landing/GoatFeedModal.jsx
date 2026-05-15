import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, FlaskConical } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import GoldenKidModal from './GoldenKidModal';

const COLOR = '#f59e0b';

const getProductsData = (lang) => [
  {
    key: 'golden-kid',
    name: 'GOLDEN Kid Milk Replacer',
    color: COLOR,
    glow: 'rgba(245,158,11,0.5)',
    desc: 'Premium formulation for goat kids — 24% crude protein, 20% fat. Fortified with prebiotics & probiotics, fat & water-soluble vitamins, trace minerals. High solubility even in cold water.',
  },
];

export default function GoatFeedModal({ open, onClose }) {
  const { lang } = useLang();
  const PRODUCTS = getProductsData(lang);
  const [goldenKidOpen, setGoldenKidOpen] = useState(false);

  return (
    <>
      <GoldenKidModal open={goldenKidOpen} onClose={() => setGoldenKidOpen(false)} />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.88)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(10,8,2,0.97) 0%, rgba(8,6,0,0.99) 100%)',
                border: `1px solid ${COLOR}55`,
                boxShadow: `0 0 60px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${COLOR}28`, border: `1.5px solid ${COLOR}66`, boxShadow: `0 0 14px ${COLOR}55` }}>
                    <FlaskConical className="w-4 h-4" style={{ color: COLOR, filter: `drop-shadow(0 0 5px ${COLOR})` }} />
                  </div>
                  <div>
                    <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">FEED SOLUTIONS</div>
                    <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>GOAT · CAPRINE NUTRITION</div>
                  </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Products */}
              <div className="p-6 space-y-3">
                {PRODUCTS.map((product, i) => (
                  <motion.div
                    key={product.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-xl p-4 cursor-pointer"
                    style={{ background: `${product.color}0d`, border: `1px solid ${product.color}28` }}
                    whileHover={{ scale: 1.015, boxShadow: `0 0 24px ${product.glow}`, borderColor: `${product.color}60` }}
                    onClick={() => { if (product.key === 'golden-kid') setGoldenKidOpen(true); }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${product.color}22`, border: `1px solid ${product.color}40`, boxShadow: `0 0 10px ${product.glow}` }}>
                        <ChevronRight className="w-4 h-4" style={{ color: product.color }} />
                      </div>
                      <div>
                        <div className="font-orbitron text-sm font-bold mb-1" style={{ color: product.color }}>{product.name}</div>
                        <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{product.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}