import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';

const tags = ['Calcium Top', 'Liquid', 'Quick Recovery'];

const benefits = [
  'Helps to prevent milk fever',
  'Helps to reduce subclinical hypocalcemia',
  'In cases of clinical milk fever it helps to recover quickly',
];

export default function CalciumTopModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,4,0.82)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(8,28,12,0.97) 0%, rgba(5,18,8,0.99) 100%)',
              border: '1px solid rgba(34,211,102,0.3)',
              boxShadow: '0 0 60px rgba(34,211,102,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(34,211,102,0.18)',
                background: 'rgba(34,211,102,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Calcium<span style={{ color: '#22c55e' }}>Top</span>
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(34,211,102,0.55)' }}>
                  XVET · LIQUID MINERAL SUPPORT
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(34,211,102,0.12)',
                      border: '1px solid rgba(34,211,102,0.35)',
                      color: '#22c55e',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(34,211,102,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/b2e3e33fc_image.png"
                    alt="Calcium Top product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(34,211,102,0.6)' }}>
                    FEATURES
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    Clinical or sub-clinical hypocalcemia eventually causes loss of appetite, paralysis, lack of movement, decrease in the functioning of smooth muscles and in some cases heart failure. Calcium Top supplies the necessary amounts of calcium and other minerals that take part in the calcium metabolism. The high concentrated minerals in this special liquid formulation are highly bio-available for a quick response. The correct application is easy because of the suitable bottle shape.
                  </p>
                  <div className="font-inter text-xs leading-relaxed mt-3" style={{ color: 'rgba(34,211,102,0.8)' }}>
                    <strong>Quick Recovery · Mineral Support</strong><br />Stand up again
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(34,211,102,0.06)',
                  border: '1px solid rgba(34,211,102,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(34,211,102,0.6)' }}>
                  BENEFITS
                </div>
                <div className="space-y-2">
                  {benefits.map(b => (
                    <div key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(34,211,102,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(34,211,102,0.6)' }}>PACKAGING</div>
                  <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    500 ml high neck bottle
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}