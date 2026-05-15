import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Download } from 'lucide-react';

const COLOR = '#f59e0b';

const BENEFITS = [
  'Made of the finest and highest quality raw materials',
  'Special formulation for providing maximum health and growth',
  'High palatability',
  'High solubility, even in cold water',
  'High digestibility and balanced fat and protein content',
  'Use of probiotics and prebiotics to support gastrointestinal tract function',
  'Easy and time-saving preparation',
  'High economic efficiency',
  'Reduce disease transmission through goat milk consumption',
  'Pasteurized and free of any microbial contamination',
  'Excellent for use in automatic machines',
];

const NUTRIENTS = [
  { name: 'Crude protein, min', value: '24%' },
  { name: 'Crude fat, min', value: '20%' },
  { name: 'Crude fiber, max', value: '0.1%' },
  { name: 'Calcium, min', value: '0.9%' },
  { name: 'Phosphorus, min', value: '0.6%' },
  { name: 'Ash', value: '7.2%' },
];

export default function GoldenKidModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[600] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.92)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(10,8,2,0.98) 0%, rgba(8,6,0,0.99) 100%)',
              border: `1px solid ${COLOR}55`,
              boxShadow: `0 0 70px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}>
              <div>
                <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">GOLDEN Kid Milk Replacer</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>NOVIN ROSHD SHAHRAN FOUDEH · FOR GOAT KIDS</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Fortified with */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="rounded-xl p-4" style={{ background: `${COLOR}0d`, border: `1px solid ${COLOR}28` }}>
                <p className="font-orbitron text-xs font-bold mb-2" style={{ color: COLOR }}>FORTIFIED WITH</p>
                <div className="flex flex-wrap gap-2">
                  {['Prebiotics & Probiotics', 'Fat & Water-Soluble Vitamins', 'Trace Minerals'].map(f => (
                    <span key={f} className="font-inter text-[11px] px-2.5 py-1 rounded-lg" style={{ background: `${COLOR}18`, color: `${COLOR}dd`, border: `1px solid ${COLOR}30` }}>{f}</span>
                  ))}
                </div>
              </motion.div>

              {/* Analysis + Ingredients side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>GUARANTEED ANALYSIS</p>
                  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: `${COLOR}18` }}>
                          <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: COLOR }}>NUTRIENT</th>
                          <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: COLOR }}>VALUE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {NUTRIENTS.map(({ name, value }, i) => (
                          <tr key={name} style={{ background: i % 2 === 0 ? `${COLOR}06` : 'transparent', borderTop: `1px solid ${COLOR}10` }}>
                            <td className="px-3 py-2 font-inter" style={{ color: 'rgba(255,255,255,0.6)' }}>{name}</td>
                            <td className="px-3 py-2 text-right font-bold font-orbitron text-[11px]" style={{ color: COLOR }}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>INGREDIENTS</p>
                  <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}20` }}>
                    <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      Skim milk powder, whey powder, whey protein concentrate (WPC), vegetable oils, minerals and vitamins, pre & probiotics
                    </p>
                  </div>

                  <div className="mt-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}20` }}>
                    <p className="font-orbitron text-[9px] font-bold mb-1.5" style={{ color: COLOR }}>MIXING & FEEDING DIRECTIONS</p>
                    <ul className="space-y-1">
                      <li className="font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>▸ Mix 1 kg of milk powder into 6 L of hot water (50 °C) to produce 7 L of reconstituted milk.</li>
                      <li className="font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>▸ Distribute at 42 °C for kids.</li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Benefits */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}>
                <p className="font-orbitron text-[10px] font-bold mb-3" style={{ color: COLOR }}>KEY BENEFITS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BENEFITS.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: COLOR }} />
                      <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Download */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
                <a href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/0dd9dfad6_Product_Foudeh.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all hover:opacity-80"
                  style={{ color: `${COLOR}99` }}>
                  <Download className="w-3 h-3" /> DOWNLOAD PRODUCT DATASHEET (PDF)
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}