import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['GrowAqua', 'Powder', 'NAGP'] : lang === 'AZ' ? ['GrowAqua', 'Toz', 'NAGP'] : ['GrowAqua', 'Порошок', 'NAGP'],
  tagline: lang === 'EN' ? 'Power of Probiotic & Prebiotic' : lang === 'AZ' ? 'Probiotik və Prebiotik gücü' : 'Сила пробиотика и пребиотика',
  features: lang === 'EN'
    ? 'Gut health is a major key to success. GrowAqua is the smart mixture of an efficient probiotic with a prebiotic coming from the yeast (S.cerevisiae). Probiotic and prebiotic in GrowAqua help to improve animal performance and have a direct effect against the unwanted micro-organisms in the gut.'
    : lang === 'AZ'
    ? 'Bağırsaq sağlamlığı uğurun əsas açarıdır. GrowAqua, maya (S. cerevisiae) mənşəli prebiotik ilə effektiv probiotikdən ibarət ağıllı bir qarışıqdır. GrowAqua-dakı probiotik və prebiotik heyvan məhsuldarlığını artırmağa kömək edir və bağırsaqda istənilməyən mikroorqanizmlərə qarşı birbaşa təsir göstərir.'
    : 'Здоровье кишечника — главный ключ к успеху. GrowAqua — это умная смесь эффективного пробиотика с пребиотиком, получаемым из дрожжей (S. cerevisiae). Пробиотик и пребиотик в составе GrowAqua помогают улучшить продуктивность животных и оказывают прямое воздействие против нежелательных микроорганизмов в кишечнике.',
  benefits: lang === 'EN' ? [
    'Helps to improve the performance of the fish and shrimps',
    'Provides probiotics to maintain good flora in the gut',
    'A good alternative to growth promoters',
  ] : lang === 'AZ' ? [
    'Balıq və karides məhsuldarlığını artırmağa kömək edir',
    'Bağırsaqda sağlam flora saxlamaq üçün probiotiklər təmin edir',
    'Böyümə stimulyatorlarına yaxşı bir alternativdir',
  ] : [
    'Помогает улучшить продуктивность рыб и креветок',
    'Обеспечивает пробиотики для поддержания здоровой флоры кишечника',
    'Хорошая альтернатива стимуляторам роста',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '1 kg, 10 kg and 25 kg craft bags' : lang === 'AZ' ? '1 kq, 10 kq və 25 kq kraft torbaları' : '1 кг, 10 кг и 25 кг крафт-мешки',
});

export default function ScaleQualityModal({ open, onClose }) {
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
              border: '1px solid rgba(26,130,192,0.3)',
              boxShadow: '0 0 60px rgba(26,130,192,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(26,130,192,0.18)',
                background: 'rgba(26,130,192,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  GrowAqua
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(26,130,192,0.55)' }}>
                  XVET · POWDER SUPPLEMENT
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
                      background: 'rgba(26,130,192,0.12)',
                      border: '1px solid rgba(26,130,192,0.35)',
                      color: '#1A82C0',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#1A82C0' }}>
                {data.tagline}
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(26,130,192,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/f76763dd5_image.png"
                    alt="GrowAqua product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(26,130,192,0.6)' }}>
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
                  background: 'rgba(26,130,192,0.06)',
                  border: '1px solid rgba(26,130,192,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(26,130,192,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="space-y-3">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#1A82C0' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(26,130,192,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(26,130,192,0.6)' }}>{data.packagingLabel}</div>
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
