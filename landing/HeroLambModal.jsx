import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Download } from 'lucide-react';

const COLOR = '#ec4899';

const ADVANTAGES = [
  'Dedicated formulation to meet the nutrient needs of lambs',
  'Constant and uniform composition',
  'Reduced lactose levels to improve performance and minimize occurrence of diarrhea',
  'Contains macro and trace minerals, fat-soluble vitamins, B-complex vitamins, and vitamin C',
  'Contains pro and prebiotics',
  'Completely pasteurized and free of any microbial contamination',
  'Does not contain any antibiotics',
];

const USES = [
  "When ewe's milk is allocated for human consumption or industrial purposes",
  'When ewe is too young or weak to produce enough milk for feeding her lamb(s)',
  'When a lamb is not receiving enough milk from the ewe because of triplet or quadruple lambs, ewes with bad udders, or other reasons',
  'Orphan or refused lambs',
];

const NUTRIENTS = [
  { name: 'Protein', value: '24 (min)', unit: '%' },
  { name: 'Fat', value: '22 (min)', unit: '%' },
  { name: 'Crude fiber', value: '<0.15', unit: '%' },
  { name: 'Ash', value: '8', unit: '%' },
  { name: 'Calcium', value: '0.9', unit: '%' },
  { name: 'Phosphorus', value: '0.6', unit: '%' },
];

const FEEDING_CHART = [
  { age: 'Day 1', qty: '6×60 ml', total: '360 ml colostrum' },
  { age: 'Day 2–3', qty: '4×125 ml', total: '500 ml' },
  { age: 'Day 4–7', qty: '4×150 ml', total: '600 ml' },
  { age: 'Day 8–10', qty: '4×200 ml', total: '800 ml' },
  { age: 'Day 11–13', qty: '3×300 ml', total: '900 ml' },
  { age: 'Week 3 (from day 14)', qty: '2×600 ml', total: '1200 ml' },
  { age: 'Week 4–6', qty: '2×700 ml', total: '1400 ml' },
  { age: 'Week 7', qty: '2×500 ml', total: '1000 ml' },
  { age: 'Week 8', qty: '1×500 ml', total: '500 ml' },
];

export default function HeroLambModal({ open, onClose }) {
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
              background: 'linear-gradient(145deg, rgba(12,4,8,0.98) 0%, rgba(8,2,6,0.99) 100%)',
              border: `1px solid ${COLOR}55`,
              boxShadow: `0 0 70px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}>
              <div>
                <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">HERO<sup className="text-[9px]" style={{ color: COLOR }}>®</sup> Lamb Milk Replacer</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>NOVIN ROSHD SHAHRAN FOUDEH · FOR LAMBS</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Tagline */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="rounded-xl p-4" style={{ background: `${COLOR}0d`, border: `1px solid ${COLOR}28` }}>
                <p className="font-orbitron text-xs font-bold mb-1" style={{ color: COLOR }}>FORTIFIED WITH</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Prebiotics & Probiotics', 'Fat & Water-Soluble Vitamins', 'Trace Minerals'].map(f => (
                    <span key={f} className="font-inter text-[11px] px-2 py-1 rounded-lg" style={{ background: `${COLOR}18`, color: `${COLOR}dd`, border: `1px solid ${COLOR}30` }}>{f}</span>
                  ))}
                </div>
              </motion.div>

              {/* Lamb Feeding Info */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>LAMB FEEDING</p>
                <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Newborn lambs should receive at least <strong style={{ color: 'rgba(255,255,255,0.85)' }}>210 ml of colostrum per kilogram of birth weight</strong> during the first 24 hours of life (e.g. a 4-kg lamb requires 840 ml). After sufficient colostrum, baby lambs can be fed milk replacer from day 2. The most ideal method is starting its feeding alongside ewe's milk.
                </p>
              </motion.div>

              {/* Guaranteed Analysis + Advantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>GUARANTEED ANALYSIS</p>
                  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: `${COLOR}18` }}>
                          <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: COLOR }}>NUTRIENT</th>
                          <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: COLOR }}>%</th>
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
                  <div className="mt-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}20` }}>
                    <p className="font-orbitron text-[9px] font-bold mb-1.5" style={{ color: COLOR }}>INGREDIENTS</p>
                    <p className="font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Skimmed milk powder, whey powder, whey protein concentrate (WPC), vegetable fats, minerals & vitamins, feed additives</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>ADVANTAGES</p>
                  <div className="space-y-1.5">
                    {ADVANTAGES.map((a, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: COLOR }} />
                        <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Uses */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>WHEN TO USE LAMB MILK REPLACER</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {USES.map((u, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg p-2.5" style={{ background: `${COLOR}08`, border: `1px solid ${COLOR}20` }}>
                      <span style={{ color: COLOR }} className="flex-shrink-0 mt-0.5 text-xs">▸</span>
                      <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{u}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mixing directions */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}
                className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}25` }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>MIXING & FEEDING DIRECTIONS</p>
                <ul className="space-y-1.5">
                  <li className="font-inter text-xs flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: COLOR }}>1.</span> Mix 1 kg of milk powder into 5 liters of hot water (45–50 °C) to produce 6 liters of reconstituted milk.</li>
                  <li className="font-inter text-xs flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: COLOR }}>2.</span> Pour half the water, add all the powder, stir until smooth. Add remaining water and stir again.</li>
                  <li className="font-inter text-xs flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: COLOR }}>3.</span> A lamb consumes about 10% of its body weight in milk per day. Bottle temperature should be 38–40 °C.</li>
                </ul>
              </motion.div>

              {/* Feeding chart */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>FEEDING CHART</p>
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: `${COLOR}18` }}>
                        {['AGE', 'QUANTITY', 'TOTAL/DAY'].map(h => (
                          <th key={h} className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: COLOR }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FEEDING_CHART.map(({ age, qty, total }, i) => (
                        <tr key={age} style={{ background: i % 2 === 0 ? `${COLOR}06` : 'transparent', borderTop: `1px solid ${COLOR}10` }}>
                          <td className="px-3 py-2 font-orbitron text-[10px] font-bold" style={{ color: COLOR }}>{age}</td>
                          <td className="px-3 py-2 font-inter" style={{ color: 'rgba(255,255,255,0.6)' }}>{qty}</td>
                          <td className="px-3 py-2 font-inter" style={{ color: 'rgba(255,255,255,0.5)' }}>{total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Download */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}>
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