import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Immunity', 'Fertility', 'Skin Quality', 'Organic performance', 'Liquid'] : lang === 'AZ' ? ['İmmunitet', 'Fertillilk', 'Dəri Keyfiyyəti', 'Üzvi performans', 'Maye'] : ['Иммунитет', 'Фертильность', 'Качество Кожи', 'Органическое действие', 'Жидкая'],
  features: lang === 'EN' ? 'Zincotin® contains organic Zinc, which offers many advantages in comparison with inorganic zinc, due to its high bioavailability. Zincotin® is a useful tool to decrease skin and fertility disorders. This activity, besides decrease organic Zinc, is supported by Biotin and Calcium pantothenate, important for proper cell growth and metabolism.' : lang === 'AZ' ? 'Zincotin® üzvi Sink ehtiva edir ki, bu da yüksək bioloji ulaşılabilir olması səbəbindən inorganik sinkə qarşı çoxlu üstünlüklər təklif edir. Zincotin® dəri və fertillilk pozuntularını azaltmaq üçün faydalı bir vasitədir. Bu aktivlik, üzvi Sink azaltmasının yanında, hüceyrə böyüməsi və metabolizmi üçün zəruri olan Biotin və Kalsium pantotenatlı dəstəklənir.' : 'Zincotin® содержит органический цинк, который имеет много преимуществ по сравнению с неорганическим цинком благодаря его высокой биодоступности. Zincotin® — полезный инструмент для снижения кожных и репродуктивных нарушений. Эта активность, помимо снижения содержания органического цинка, поддерживается биотином и пантотенатом кальция, важными для надлежащего роста клеток и метаболизма.',
  benefits: lang === 'EN' ? [
    'Optimized body own resistance',
    'Improved fertility and hatchability',
    'Better immunity',
    'Enhanced skin, bone, feather and hoof condition',
    'Healthy appetite',
    'Protection against oxidative stress',
  ] : lang === 'AZ' ? [
    'Optimallaşdırılmış bədən müqavimləri',
    'İyilişmiş fertillilk və yumurtaxəçəklik',
    'Daha yaxşı immunitet',
    'Güçləndirilmiş dəri, sümük, tüy və dırnaq vəziyyəti',
    'Sağlam iştaha',
    'Oksidativ stressdən qorunma',
  ] : [
    'Оптимизированная собственная устойчивость организма',
    'Улучшенная фертильность и выводимость',
    'Лучший иммунитет',
    'Улучшение кожи, костей, перьев и условия копыт',
    'Здоровый аппетит',
    'Защита от окислительного стресса',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALAr' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml, 500 ml and 1 l bottle, 5 l and 25 l canister' : lang === 'AZ' ? '250 ml, 500 ml və 1 l şişə, 5 l və 25 l kanister' : '250 мл, 500 мл и 1 л бутылка, 5 л и 25 л канистра',
});

export default function ZincotinModal({ open, onClose }) {
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
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Zincotin<span style={{ color: '#a78bfa' }}>®</span>
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(167,139,250,0.55)' }}>
                  XVET · ORGANIC ZINC COMPLEX
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
                      background: 'rgba(167,139,250,0.12)',
                      border: '1px solid rgba(167,139,250,0.35)',
                      color: '#a78bfa',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Product image + description side by side */}
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Image */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(167,139,250,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/b525edd65_image.png"
                    alt="Zincotin® product"
                    className="w-full object-contain"
                    style={{ maxHeight: '180px' }}
                  />
                </div>

                {/* Features description */}
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(167,139,250,0.6)' }}>
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
                  background: 'rgba(167,139,250,0.06)',
                  border: '1px solid rgba(167,139,250,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(167,139,250,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.benefits.map(b => (
                    <div key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#a78bfa' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(167,139,250,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(167,139,250,0.6)' }}>{data.packagingLabel}</div>
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