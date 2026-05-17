import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Vitamin AD3E', 'Liquid', 'Vitamin/Mineral/Amino Acids'] : lang === 'AZ' ? ['Vitamin AD3E', 'Maye', 'Vitamin/Mineral/Amino Turşular'] : ['Витамин AD3E', 'Жидкая', 'Витамин/Минерал/Аминокислоты'],
  tagline: lang === 'EN' ? 'Advanced protection' : lang === 'AZ' ? 'Gücləndirilmiş qorunma' : 'Расширенная защита',
  features: lang === 'EN'
    ? 'Vitamin deficiency leads to metabolic malfunctions, resulting in growth depression, lower performance and immunity, and an increased susceptibility to diseases. Vitamin AD3E provides the livestock animals with the optimal amount of requirements. Especially vitamins A, D3, and E have been proven to be efficient in improving performance parameters in all species.'
    : lang === 'AZ'
    ? 'Vitamin çatışmazlığı metabolik pozuntulara gətirib çıxarır — bu isə böyümənin ləngiməsinə, performans və immunitetin azalmasına, xəstəliklərə qarşı həssaslığın artmasına səbəb olur. Vitamin AD3E heyvanlara lazımi vitaminlərin optimal miqdarda verilməsini təmin edir. Xüsusilə A, D3 və E vitaminlərinin bütün növlərdə məhsuldarlıq göstəricilərini yaxşılaşdırmaqda effektiv olduğu sübut edilmişdir.'
    : 'Дефицит витаминов приводит к метаболическим нарушениям, выражающимся в торможении роста, снижении продуктивности и иммунитета, а также в повышенной восприимчивости к болезням. Vitamin AD3E обеспечивает сельскохозяйственных животных оптимальным количеством необходимых витаминов. Особенно витамины A, D3 и E доказали свою эффективность в улучшении показателей продуктивности у всех видов животных.',
  benefits: lang === 'EN' ? [
    'Supports better health status, immune response, hatchability, and somatic quality',
    'Provides resistance to diseases and promotes health, growth, and fertility',
    'Improved feed efficiency, FCR, and weight gain',
  ] : lang === 'AZ' ? [
    'Sağlamlıq vəziyyətini, immun cavabını, cücərmə qabiliyyətini və somatik keyfiyyəti dəstəkləyir',
    'Xəstəliklərə qarşı müqavimət yaradır, sağlamlığı, böyüməni və fertilliliyi təşviq edir',
    'Yem effektivliyini, YDN-ni və çəki artımını yaxşılaşdırır',
  ] : [
    'Поддерживает состояние здоровья, иммунный ответ, выводимость и соматическое качество',
    'Обеспечивает устойчивость к болезням и способствует здоровью, росту и фертильности',
    'Улучшение усвояемости корма, конверсии корма (FCR) и привеса',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml, 500 ml, and 1 l bottles, 5 l, and 25 l canisters' : lang === 'AZ' ? '250 ml, 500 ml və 1 l şüşələr, 5 l və 25 l kanisterlər' : '250 мл, 500 мл и 1 л бутылки, 5 л и 25 л канистры',
});

export default function VitaminAD3EModal({ open, onClose }) {
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
              border: '1px solid rgba(251,191,36,0.3)',
              boxShadow: '0 0 60px rgba(251,191,36,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(251,191,36,0.18)',
                background: 'rgba(251,191,36,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Vitamin AD3E
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(251,191,36,0.55)' }}>
                  XVET · LIQUID SUPPLEMENT
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
                      background: 'rgba(251,191,36,0.12)',
                      border: '1px solid rgba(251,191,36,0.35)',
                      color: '#fbbf24',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#fbbf24' }}>
                {data.tagline}
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(251,191,36,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/e5e32da14_image.png"
                    alt="Vitamin AD3E product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(251,191,36,0.6)' }}>
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
                  background: 'rgba(251,191,36,0.06)',
                  border: '1px solid rgba(251,191,36,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(251,191,36,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="space-y-3">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(251,191,36,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(251,191,36,0.6)' }}>{data.packagingLabel}</div>
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
