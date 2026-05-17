import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Turbo Grow', 'Powder', 'Gut Health'] : lang === 'AZ' ? ['Turbo Grow', 'Toz', 'Bağırsaq Sağlamlığı'] : ['Turbo Grow', 'Порошок', 'Здоровье Кишечника'],
  features: lang === 'EN'
    ? 'Turbo Grow is a synergistic formulation aimed at improving gut health, performance, and growth for all animal species. The new era of eliminating antibiotic growth promoters relies on smart formulas such as Turbo Grow, which address multiple problems in a cost-efficient way. Turbo Grow further contains the most efficient Bentonite against Aflatoxin (mycotoxins produced by two species of Aspergillus, a fungus found especially in areas with hot and humid climates). As an integral approach, Turbo Grow is the perfect choice for a non-antibiotic growth enhancer.'
    : lang === 'AZ'
    ? 'Turbo Grow bütün heyvan növləri üçün bağırsaq sağlamlığını, performansı və böyüməni yaxşılaşdırmağa yönəlmiş sinergik formulasiyadır. Antibiotik böyümə stimulyatorlarının aradan qaldırılmasının yeni dövrü Turbo Grow kimi ağıllı formulalara əsaslanır ki, bunlar bir neçə problemi xərclərə uyğun şəkildə həll edir. Turbo Grow bundan əlavə Aflatoksinə qarşı ən effektiv Bentoniti ehtiva edir (xüsusilə isti və rütubətli iqlim bölgələrindəki Aspergillus növlərinin iki növü tərəfindən istehsal edilən mikotoksinlər). Kompleks yanaşma kimi, Turbo Grow antibiotik olmayan böyümə stimulyatoru üçün mükəmməl seçimdir.'
    : 'Turbo Grow — это синергическая формуляция, направленная на улучшение здоровья кишечника, продуктивности и роста для всех видов животных. Новая эра исключения антибиотических стимуляторов роста опирается на умные формулы, такие как Turbo Grow, которые решают несколько проблем экономически эффективным способом. Turbo Grow также содержит наиболее эффективный бентонит против афлатоксина (микотоксины, производимые двумя видами Aspergillus — гриба, встречающегося особенно в районах с жарким и влажным климатом). Как комплексный подход, Turbo Grow — идеальный выбор в качестве безантибиотического стимулятора роста.',
  featuresNote: lang === 'EN'
    ? '*Formerly known as Turbo Tox, the global name of the product has been changed to Turbo Grow'
    : lang === 'AZ'
    ? '*Əvvəllər Turbo Tox kimi tanınan məhsulun qlobal adı Turbo Grow olaraq dəyişdirilmişdir'
    : '*Ранее известный как Turbo Tox, глобальное название продукта было изменено на Turbo Grow',
  benefits: lang === 'EN' ? [
    '"Non-antibiotic" growth promoter.',
    'Improved feed performance.',
    'Improves weight gain, egg, and meat yield.',
    'Triggers intestinal nonspecific immune modulation.',
    'Feed preservative against moulds, bacteria, vectors, and mycotoxins.',
    'Better litter quality.',
    'Unique product without any carrier in it.',
  ] : lang === 'AZ' ? [
    '"Antibiotik olmayan" böyümə stimulyatoru.',
    'Yem performansının yaxşılaşdırılması.',
    'Çəki artımını, yumurta və ət məhsuldarlığını artırır.',
    'Bağırsağın qeyri-spesifik immun modullaşmasını aktivləşdirir.',
    'Küf göbələklərinə, bakteriyalara, vektorlara və mikotoksinlərə qarşı yem konservantı.',
    'Daha yaxşı döşəmə keyfiyyəti.',
    'Heç bir daşıyıcı olmayan unikal məhsul.',
  ] : [
    'Стимулятор роста без антибиотиков.',
    'Улучшенная усвояемость корма.',
    'Улучшает прирост массы тела, яйценоскость и мясную продуктивность.',
    'Активирует неспецифическую иммунную модуляцию кишечника.',
    'Консервант корма против плесени, бактерий, переносчиков и микотоксинов.',
    'Лучшее качество подстилки.',
    'Уникальный продукт без каких-либо носителей.',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '10 kg and 25 kg craft bags' : lang === 'AZ' ? '10 kq və 25 kq kağız torbalar' : '10 кг и 25 кг крафт-мешки',
});

export default function TurboGrowModal({ open, onClose }) {
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
              border: '1px solid rgba(52,211,153,0.3)',
              boxShadow: '0 0 60px rgba(52,211,153,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(52,211,153,0.18)',
                background: 'rgba(52,211,153,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Turbo<span style={{ color: '#34d399' }}>Grow</span>
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(52,211,153,0.55)' }}>
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
                      background: 'rgba(52,211,153,0.12)',
                      border: '1px solid rgba(52,211,153,0.35)',
                      color: '#34d399',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#34d399' }}>
                1 for all, all inside 1
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(52,211,153,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/f98751dc1_image.png"
                    alt="Turbo Grow product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(52,211,153,0.6)' }}>
                    {data.featureLabel}
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {data.features}
                  </p>
                  <p className="font-inter text-xs leading-relaxed mt-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {data.featuresNote}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(52,211,153,0.06)',
                  border: '1px solid rgba(52,211,153,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(52,211,153,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="space-y-3">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#34d399' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(52,211,153,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(52,211,153,0.6)' }}>{data.packagingLabel}</div>
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
