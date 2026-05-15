import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Shield, Droplets } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getProducts = (lang) => [
  {
    key: 'colony-strength',
    name: lang === 'EN' ? 'Colony Strength' : lang === 'AZ' ? 'Koloni Gücü' : 'Сила Колонии',
    icon: Shield,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    desc: lang === 'EN' ? 'Royal jelly & bee propolis complex for hive resilience and population growth — enhances queen productivity and worker bee vitality.' : lang === 'AZ' ? 'Kral jeli və arı propolisi kompleksi kovan dirəyə mütəhəmmilliyi və popuasiya artımı üçün — kraliçanın produktivliyini və işçi arı vitaliyini güçləndirir.' : 'Комплекс маточного молочка и пчелиного прополиса для устойчивости улья и роста популяции — повышает производительность матки и жизненные силы рабочих пчел.',
  },
  {
    key: 'disease-resistance',
    name: lang === 'EN' ? 'Disease Resistance' : lang === 'AZ' ? 'Xəstəlik Müqaviməti' : 'Устойчивость к Болезням',
    icon: Droplets,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: lang === 'EN' ? 'Essential oil blend for Varroa mite & nosema control — botanical antimicrobial support without synthetic treatments.' : lang === 'AZ' ? 'Varroa mitə və nosema nəzarəti üçün əssensial yağ qarışığı — sintetik müalicə olmadan botanik antimikrob dəstəyi.' : 'Смесь эфирных масел для контроля клеща Варроа и нозематоза — растительная противомикробная поддержка без синтетических средств.',
  },
];

export default function BeesHealthModal({ open, onClose }) {
  const { lang } = useLang();
  const PRODUCTS = getProducts(lang);
  
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(12,8,3,0.85)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(12,8,3,0.97) 0%, rgba(8,5,2,0.99) 100%)',
              border: '1px solid rgba(251,191,36,0.44)',
              boxShadow: '0 0 60px rgba(251,191,36,0.18), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(251,191,36,0.22)', background: 'rgba(251,191,36,0.09)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(251,191,36,0.28)', border: '1.5px solid rgba(251,191,36,0.55)', boxShadow: '0 0 14px rgba(251,191,36,0.55)' }}
                >
                  <span className="text-lg">🐝</span>
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">{lang === 'EN' ? 'HEALTH SOLUTIONS' : lang === 'AZ' ? 'SAĞLAMLIQ HƏLLƏRI' : 'РЕШЕНИЯ ДЛЯ ЗДОРОВЬЯ'}</div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(251,191,36,0.88)' }}>
                    {lang === 'EN' ? 'BEES · APICULTURE HEALTH PRODUCTS' : lang === 'AZ' ? 'ARILAR · ARIQÇULUQ SAĞLAMLIQ MƏHSULLARI' : 'ПЧЕЛЫ · ПРОДУКТЫ ДЛЯ ЗДОРОВЬЯ ПАСЕКИ'}
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

            {/* Product List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {PRODUCTS.map((product, i) => {
                const PIcon = product.icon;
                return (
                  <motion.div
                    key={product.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl p-4"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}0d, ${product.color}05)`,
                      border: `1px solid ${product.color}28`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${product.color}22`, border: `1px solid ${product.color}40`, boxShadow: `0 0 10px ${product.glow}` }}
                      >
                        <PIcon className="w-4 h-4" style={{ color: product.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-orbitron text-sm font-bold mb-1" style={{ color: product.color }}>{product.name}</div>
                        <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{product.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}