import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['NAGP', 'Growth Enhancement', 'Non-Antibiotic', 'Liquid'] : lang === 'AZ' ? ['NAGP', 'Böyümə Stimulasiyası', 'Antibiotik deyil', 'Maye'] : ['NAGP', 'Стимуляция Роста', 'Без антибиотиков', 'Жидкая'],
  features: lang === 'EN'
    ? 'OregoPlus® is a rich combination of essential oils designed to support performance parameters, making an effective non-antibiotic growth enhancer. Rich combination of essential oils are cost effective due to low dosage. OregoPlus® is ideal to be used throughout as a growth enhancer, or during high risk periods, where it offers its powerful antioxidant activity.'
    : lang === 'AZ'
    ? 'OregoPlus®, performans göstəricilərini dəstəkləmək üçün nəzərdə tutulmuş efir yağlarının zəngin birləşməsidir və effektiv antibiotik olmayan böyümə stimulatoru rolunu oynayır. Efir yağlarının zəngin birləşməsi aşağı dozası sayəsində xərc effektivliyi yüksəkdir. OregoPlus® böyümə stimulatoru kimi davamlı istifadə üçün və ya güclü antioksidant fəaliyyətini göstərdiyi yüksək risk dövrlərində istifadə üçün idealdır.'
    : 'OregoPlus® — это богатая комбинация эфирных масел, разработанная для поддержки показателей продуктивности, что делает её эффективным безантибиотиковым стимулятором роста. Богатая комбинация эфирных масел является экономически эффективной благодаря низкой дозировке. OregoPlus® идеально подходит для постоянного использования в качестве стимулятора роста или в периоды высокого риска, когда он проявляет свою мощную антиоксидантную активность.',
  benefits: lang === 'EN' ? [
    'Increased intake, performance parameters and growth',
    'Better feed efficiency',
    'Powerful anti-oxidant activity',
    'Support in case of digestive disorders',
    'Cost-effective, profitable solution to growth enhancement',
    'Alternative or support to conventional treatments',
  ] : lang === 'AZ' ? [
    'Artırılmış qəbul, performans göstəriciləri və böyümə',
    'Daha yaxşı yem effektivliyi',
    'Güclü antioksidant fəaliyyəti',
    'Həzm pozuntuları zamanı dəstək',
    'Böyümə stimulasiyası üçün xərc effektiv, gəlirli həll',
    'Ənənəvi müalicələrə alternativ və ya dəstək',
  ] : [
    'Повышенное потребление, показатели продуктивности и рост',
    'Лучшая эффективность корма',
    'Мощная антиоксидантная активность',
    'Поддержка при нарушениях пищеварения',
    'Экономически эффективное, прибыльное решение для стимуляции роста',
    'Альтернатива или дополнение к традиционным методам лечения',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml, 500 ml and 1 l bottle, 5 l and 25 l canister' : lang === 'AZ' ? '250 ml, 500 ml və 1 l şişə, 5 l və 25 l kanister' : '250 мл, 500 мл и 1 л бутылка, 5 л и 25 л канистра',
});

export default function OregoPlusModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
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
              border: '1px solid rgba(232,121,249,0.3)',
              boxShadow: '0 0 60px rgba(232,121,249,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(232,121,249,0.18)',
                background: 'rgba(232,121,249,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Orego<span style={{ color: '#e879f9' }}>Plus®</span>
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(232,121,249,0.55)' }}>
                  XVET · ESSENTIAL OILS BLEND
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
                {data.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(232,121,249,0.12)',
                      border: '1px solid rgba(232,121,249,0.35)',
                      color: '#e879f9',
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
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(232,121,249,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/e2b3792a2_image.png"
                    alt="OregoPlus® product"
                    className="w-full object-contain"
                    style={{ maxHeight: '180px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(232,121,249,0.6)' }}>
                    {data.featureLabel}
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {data.features}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(232,121,249,0.06)',
                  border: '1px solid rgba(232,121,249,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(232,121,249,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.benefits.map(b => (
                    <div key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#e879f9' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(232,121,249,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(232,121,249,0.6)' }}>{data.packagingLabel}</div>
                  <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {data.packagingDesc}
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
