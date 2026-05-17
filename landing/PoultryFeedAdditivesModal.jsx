import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FlaskConical, ChevronRight } from 'lucide-react';
import AGalProModal from './AGalProModal';
import MyvatexModal from './MyvatexModal';
import EverwellModal from './EverwellModal';
import CalpronaModal from './CalpronaModal';
import NutriProfitModal from './NutriProfitModal';
import NutriXtendModal from './NutriXtendModal';
import { useLang } from '@/lib/i18n';

const getProducts = (lang) => [
  {
    key: 'feed-enzymes',
    name: lang === 'EN' ? 'Feed Enzymes' : lang === 'AZ' ? 'Yem Fermentləri' : 'Ферменты Корма',
    tm: false,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: lang === 'EN'
      ? 'Advanced enzymatic complexes that break down anti-nutritional factors and enhance nutrient digestibility across all feed types.'
      : lang === 'AZ'
      ? 'Bütün yem növlərindəki antinutrisional amilləri parçalayan və qida həzmini artıran qabaqcıl ferment kompleksləri.'
      : 'Передовые ферментные комплексы, расщепляющие антипитательные факторы и повышающие усвояемость питательных веществ во всех видах кормов.',
  },
  {
    key: 'myvatex',
    name: 'Myvatex',
    tm: true,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    desc: lang === 'EN'
      ? 'AF-11 Emulsifier — premium emulsification technology that optimizes fat digestion and improves energy utilization in poultry diets.'
      : lang === 'AZ'
      ? 'AF-11 Emulsifikator — quş yemləmə pəhrizlərində yağ həzmini optimallaşdıran və enerji istifadəsini yaxşılaşdıran premium emulsifikasiya texnologiyası.'
      : 'AF-11 Эмульгатор — премиальная технология эмульгирования, оптимизирующая переваривание жиров и улучшающая усвоение энергии в рационах птицы.',
  },
  {
    key: 'everwell',
    name: 'Everwell',
    tm: true,
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.5)',
    desc: lang === 'EN'
      ? 'PT 100 — a comprehensive performance supplement designed to support growth, vitality and overall flock uniformity.'
      : lang === 'AZ'
      ? 'PT 100 — böyüməni, canlılığı və ümumi sürü bərabərliyini dəstəkləmək üçün nəzərdə tutulmuş hərtərəfli performans əlavəsi.'
      : 'PT 100 — комплексная добавка для производительности, предназначенная для поддержки роста, жизнеспособности и однородности стада.',
  },
  {
    key: 'calproma',
    name: lang === 'EN' ? 'Calproma Feed Additives' : lang === 'AZ' ? 'Calproma Yem Əlavələri' : 'Calproma Кормовые Добавки',
    tm: false,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    desc: lang === 'EN'
      ? 'Specialized calcium and mineral additives formulated for optimal bone development, eggshell quality and metabolic support.'
      : lang === 'AZ'
      ? 'Optimal sümük inkişafı, yumurta qabığı keyfiyyəti və metabolik dəstək üçün hazırlanmış xüsusi kalsium və mineral əlavələri.'
      : 'Специализированные добавки кальция и минералов, разработанные для оптимального развития костей, качества яичной скорлупы и метаболической поддержки.',
  },
  {
    key: 'nutri-profit',
    name: lang === 'EN' ? 'Nutri-Profit Conc' : lang === 'AZ' ? 'Nutri-Profit Konsentrat' : 'Nutri-Profit Конц',
    tm: false,
    color: '#f97316',
    glow: 'rgba(249,115,22,0.5)',
    desc: lang === 'EN'
      ? 'High-density nutrient concentrate delivering precision amino acid profiles and vitamins for maximum feed conversion efficiency.'
      : lang === 'AZ'
      ? 'Maksimum yem çevrilmə səmərəliliyi üçün dəqiq amin turşusu profilləri və vitaminlər təqdim edən yüksək sıxlıqlı qida konsentratı.'
      : 'Высококонцентрированный питательный концентрат, обеспечивающий точные профили аминокислот и витаминов для максимальной эффективности конверсии корма.',
  },
  {
    key: 'nutri-xtend',
    name: 'Nutri Xtend',
    tm: true,
    suffix: 'Optim',
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.5)',
    desc: lang === 'EN'
      ? 'Optim — next-generation nutrient extension technology that prolongs bioavailability and ensures sustained performance gains throughout production cycles.'
      : lang === 'AZ'
      ? 'Optim — istehsal dövrlərindən sonra bioloji mövcudluğu uzadan və davamlı performans artımını təmin edən növbəti nəsil qida uzatma texnologiyası.'
      : 'Optim — технология питательного расширения следующего поколения, продлевающая биодоступность и обеспечивающая устойчивый рост производительности на протяжении производственных циклов.',
  },
];

const getLabels = (lang) => ({
  headerTitle: lang === 'EN' ? 'FEED ADDITIVES' : lang === 'AZ' ? 'YEM ƏLAVƏLƏRİ' : 'КОРМОВЫЕ ДОБАВКИ',
  headerSub: lang === 'EN' ? 'POULTRY · NUTRITION SOLUTIONS' : lang === 'AZ' ? 'QUŞÇULUQ · QİDALANMA HƏLLƏRİ' : 'ПТИЦЕВОДСТВО · РЕШЕНИЯ ПО ПИТАНИЮ',
});

function ProductBadge({ name, tm, suffix, color }) {
  return (
    <span className="relative inline-flex items-baseline gap-1 font-orbitron font-bold" style={{ color }}>
      {name}
      {tm && (
        <sup className="text-[8px] font-bold" style={{ color, verticalAlign: 'super', lineHeight: 1 }}>TM</sup>
      )}
      {suffix && (
        <span className="ml-1">{suffix}</span>
      )}
    </span>
  );
}

export default function PoultryFeedAdditivesModal({ open, onClose }) {
  const { lang } = useLang();
  const PRODUCTS = getProducts(lang);
  const labels = getLabels(lang);

  const [agalProOpen, setAgalProOpen] = useState(false);
  const [myvatexOpen, setMyvatexOpen] = useState(false);
  const [everwellOpen, setEverwellOpen] = useState(false);
  const [calpronaOpen, setCalpronaOpen] = useState(false);
  const [nutriProfitOpen, setNutriProfitOpen] = useState(false);
  const [nutriXtendOpen, setNutriXtendOpen] = useState(false);

  const handleProductClick = (key) => {
    if (key === 'feed-enzymes') setAgalProOpen(true);
    if (key === 'myvatex') setMyvatexOpen(true);
    if (key === 'everwell') setEverwellOpen(true);
    if (key === 'calproma') setCalpronaOpen(true);
    if (key === 'nutri-profit') setNutriProfitOpen(true);
    if (key === 'nutri-xtend') setNutriXtendOpen(true);
  };

  return (
    <>
    <AGalProModal open={agalProOpen} onClose={() => setAgalProOpen(false)} />
    <MyvatexModal open={myvatexOpen} onClose={() => setMyvatexOpen(false)} />
    <EverwellModal open={everwellOpen} onClose={() => setEverwellOpen(false)} />
    <CalpronaModal open={calpronaOpen} onClose={() => setCalpronaOpen(false)} />
    <NutriProfitModal open={nutriProfitOpen} onClose={() => setNutriProfitOpen(false)} />
    <NutriXtendModal open={nutriXtendOpen} onClose={() => setNutriXtendOpen(false)} />
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.85)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(8,14,30,0.97) 0%, rgba(5,10,22,0.99) 100%)',
              border: '1px solid rgba(52,211,153,0.3)',
              boxShadow: '0 0 60px rgba(52,211,153,0.10), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(52,211,153,0.15)',
                background: 'rgba(52,211,153,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(52,211,153,0.18)',
                    border: '1.5px solid rgba(52,211,153,0.45)',
                    boxShadow: '0 0 14px rgba(52,211,153,0.4)',
                  }}
                >
                  <FlaskConical className="w-4 h-4" style={{ color: '#34d399', filter: 'drop-shadow(0 0 5px #34d399)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    {labels.headerTitle}
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(52,211,153,0.55)' }}>
                    {labels.headerSub}
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
              {PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-xl p-4 cursor-pointer transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}0d, ${product.color}05)`,
                    border: `1px solid ${product.color}28`,
                  }}
                  whileHover={{
                    scale: 1.015,
                    boxShadow: `0 0 24px ${product.glow}`,
                    borderColor: `${product.color}60`,
                  }}
                  onClick={() => handleProductClick(product.key)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}22, ${product.color}08)`,
                        border: `1px solid ${product.color}40`,
                        boxShadow: `0 0 10px ${product.glow}`,
                      }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: product.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <ProductBadge name={product.name} tm={product.tm} suffix={product.suffix} color={product.color} />
                      </div>
                      <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {product.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
