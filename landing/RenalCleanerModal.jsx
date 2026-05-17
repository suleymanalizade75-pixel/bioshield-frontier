import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Kidney Support', 'A Good Plumber', 'Quick solution', 'Liquid'] : lang === 'AZ' ? ['Böyrək Dəstəyi', 'Sürətli Həll', 'Maye'] : ['Поддержка Почек', 'Быстрое Решение', 'Жидкая'],
  features: lang === 'EN'
    ? 'Renal Cleaner is especially designed to help animals cope with negative consequences of renal disorders. Use Renal Cleaner as a preventive solution in case of high protein diets, at first symptoms of renal problems in livestock such as high risk of mycotoxin contamination of feedstuffs or after repetitive use of antibiotics and other kidney-damaging medications. Renal Cleaner is a nutraceutical support that can be used in cases of conditions related with disease causing agents that may affect kidney functions.'
    : lang === 'AZ'
    ? 'Renal Cleaner xüsusilə heyvanların böyrək pozuntularının mənfi nəticələri ilə mübarizə aparmasına kömək etmək üçün hazırlanmışdır. Renal Cleaner-i yüksək zülal pəhrizlərində, yem maddələrinin mikotoksinlə çirklənmə riski yüksək olduqda və ya antibiotiklərin və digər böyrəkzərərli dərmanların təkrar istifadəsindən sonra böyrək problemlərinin ilk əlamətlərində profilaktik həll kimi istifadə edin. Renal Cleaner böyrək funksiyalarına təsir edə bilən xəstəlik törədicilərindən qaynaqlanan vəziyyətlərdə istifadə edilə bilən nutrasevtik dəstəkdir.'
    : 'Renal Cleaner разработан специально для помощи животным в преодолении негативных последствий почечных расстройств. Применяйте Renal Cleaner в качестве профилактического средства при высокобелковых диетах, при первых симптомах почечных проблем у животных, таких как высокий риск загрязнения кормов микотоксинами, или после повторного применения антибиотиков и других нефротоксичных препаратов. Renal Cleaner — это нутрицевтическая поддержка, которую можно использовать при состояниях, связанных с возбудителями болезней, способными нарушить функции почек.',
  benefits: lang === 'EN' ? [
    'Quick and specific problem solver',
    'Replenishes energy and electrolytes',
    'Support of kidney activities',
    'Cost-efficient solution',
  ] : lang === 'AZ' ? [
    'Sürətli və spesifik problem həlledici',
    'Enerji və elektrolitləri bərpa edir',
    'Böyrək fəaliyyətinin dəstəklənməsi',
    'Xərclərə uyğun həll',
  ] : [
    'Быстрое и целенаправленное решение проблем',
    'Восполняет энергию и электролиты',
    'Поддержка функций почек',
    'Экономически эффективное решение',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml, 500 ml and 1 l bottle, 5 l and 25 l canister' : lang === 'AZ' ? '250 ml, 500 ml və 1 l şişə, 5 l və 25 l kanister' : '250 мл, 500 мл и 1 л бутылка, 5 л и 25 л канистра',
});

export default function RenalCleanerModal({ open, onClose }) {
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
              border: '1px solid rgba(96,165,250,0.3)',
              boxShadow: '0 0 60px rgba(96,165,250,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(96,165,250,0.18)',
                background: 'rgba(96,165,250,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Renal Cleaner
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(96,165,250,0.55)' }}>
                  XVET · KIDNEY & RENAL SUPPORT
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
                      background: 'rgba(96,165,250,0.12)',
                      border: '1px solid rgba(96,165,250,0.35)',
                      color: '#60a5fa',
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
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(96,165,250,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/463dcced2_image.png"
                    alt="Renal Cleaner product"
                    className="w-full object-contain"
                    style={{ maxHeight: '180px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(96,165,250,0.6)' }}>
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
                  background: 'rgba(96,165,250,0.06)',
                  border: '1px solid rgba(96,165,250,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.benefits.map(b => (
                    <div key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#60a5fa' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(96,165,250,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(96,165,250,0.6)' }}>{data.packagingLabel}</div>
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
