import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Egg } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  headerTitle: lang === 'EN' ? 'CATTLE · FERTILITY' : lang === 'AZ' ? 'MAL-QARA · FERTİLLİK' : 'СКОТ · ФЕРТИЛЬНОСТЬ',
  headerSub: lang === 'EN' ? 'REPRODUCTIVE PERFORMANCE' : lang === 'AZ' ? 'REPRODUKTİV PERFORMANS' : 'РЕПРОДУКТИВНАЯ ПРОДУКТИВНОСТЬ',

  label: lang === 'EN' ? 'Fertility' : lang === 'AZ' ? 'Fertillilk' : 'Фертильность',

  desc: lang === 'EN'
    ? 'Reproductive performance, egg production rate & hatchability optimization protocols.'
    : lang === 'AZ'
    ? 'Reproduktiv performans, yumurta istehsal nisbəti və yumurtaxəçəklik optimallaşdırma protokolları.'
    : 'Протоколы оптимизации репродуктивной продуктивности, показателя яйценоскости и выводимости.',

  products: ['Zincotin®'],
});

export default function FertilityModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);

  const fertilityData = {
    key: 'fertility',
    label: data.label,
    Icon: Egg,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    desc: data.desc,
    products: data.products,
  };

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
              border: '1px solid rgba(167,139,250,0.3)',
              boxShadow: '0 0 60px rgba(167,139,250,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(167,139,250,0.18)',
                background: 'rgba(167,139,250,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(167,139,250,0.18)',
                    border: '1.5px solid rgba(167,139,250,0.45)',
                    boxShadow: '0 0 14px rgba(167,139,250,0.4)',
                  }}
                >
                  <Egg className="w-4 h-4" style={{ color: '#a78bfa', filter: 'drop-shadow(0 0 5px #a78bfa)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    {data.headerTitle}
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(167,139,250,0.55)' }}>
                    {data.headerSub}
                  </div>
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
            <div className="flex-1 overflow-y-auto p-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-5"
                style={{
                  background: `linear-gradient(135deg, ${fertilityData.color}10, ${fertilityData.color}04)`,
                  border: `1px solid ${fertilityData.color}35`,
                  boxShadow: `0 0 30px ${fertilityData.glow}`,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${fertilityData.color}28, ${fertilityData.color}0a)`,
                      border: `1.5px solid ${fertilityData.color}55`,
                      boxShadow: `0 0 20px ${fertilityData.glow}`,
                    }}
                  >
                    <fertilityData.Icon className="w-7 h-7" style={{ color: fertilityData.color, filter: `drop-shadow(0 0 8px ${fertilityData.color})` }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-orbitron text-base font-bold text-white tracking-wider mb-2">
                      {fertilityData.label}
                    </div>
                    <p className="font-inter text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {fertilityData.desc}
                    </p>
                    {/* Product chips */}
                    <div className="flex flex-wrap gap-2">
                      {fertilityData.products.map((p) => (
                        <motion.div
                          key={p}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer"
                          style={{
                            background: `linear-gradient(135deg, ${fertilityData.color}20, ${fertilityData.color}08)`,
                            border: `1px solid ${fertilityData.color}45`,
                            boxShadow: `0 0 8px ${fertilityData.glow}`,
                          }}
                        >
                          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: fertilityData.color }} />
                          <span className="font-orbitron text-[10px] font-bold tracking-widest whitespace-nowrap" style={{ color: fertilityData.color }}>
                            {p}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
