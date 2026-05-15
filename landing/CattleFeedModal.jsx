import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Activity, Thermometer, Shield, Droplets,
  FlaskConical, Wind, Milk, Heart, ChevronRight
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import AromaxDryCattleModal from './AromaxDryCattleModal';
import CattleMilkReplacersModal from './CattleMilkReplacersModal';
import MouldGuardDiamondModal from './MouldGuardDiamondModal';
import ToxiGuardModal from './ToxiGuardModal';
import TurboGrowModal from './TurboGrowModal';
import MilQModal from './MilQModal';

const getFeedCategoriesData = (lang) => [
  {
    key: 'feed-intake',
    label: lang === 'EN' ? 'Feed Intake' : lang === 'AZ' ? 'Yem İstehsalı' : 'Потребление Корма',
    Icon: Activity,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: lang === 'EN' ? 'Palatability enhancers and appetite stimulants for improved consumption and feed efficiency in dairy and beef cattle.' : lang === 'AZ' ? 'Süt və ət qaramalında artan istehlak və yem dəyərindəliyi üçün ləzzət artırıcıları və iştaha stimulyatorları.' : 'Усилители вкусовых качеств и стимуляторы аппетита для улучшения потребления и эффективности корма у молочного и мясного скота.',
    products: [{ name: 'Aromax® Dry', modal: 'aromax-dry' }],
  },
  {
    key: 'feed-quality',
    label: lang === 'EN' ? 'Feed Quality' : lang === 'AZ' ? 'Yem Keyfiyyəti' : 'Качество Корма',
    Icon: Thermometer,
    color: '#f87171',
    glow: 'rgba(248,113,113,0.5)',
    desc: lang === 'EN' ? 'Quality assurance and nutrient bioavailability optimization for maximum performance metrics.' : lang === 'AZ' ? 'Maksimum performans metrikaları üçün keyfiyyət təminatı və qida maddəsi bioyararlanabilirlik optimallaşdırılması.' : 'Гарантия качества и оптимизация биодоступности питательных веществ для максимальных показателей производства.',
    products: [{ name: 'Mould Guard Diamond', modal: 'mould-guard' }, { name: 'Toxi-Guard', modal: 'toxi-guard' }],
  },
  {
    key: 'gut-health',
    label: lang === 'EN' ? 'Gut Health' : lang === 'AZ' ? 'Həzm Sağlığı' : 'Здоровье ЖКТ',
    Icon: Activity,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: lang === 'EN' ? 'Microbiome balance, villi integrity and pathogen control for superior nutrient absorption and animal performance.' : lang === 'AZ' ? 'Yüksək qida maddəsi absorbsiyası və heyvan performansı üçün mikrobiom balansı, vilya bütövlüyü və patogen kontrolü.' : 'Баланс микробиома, целостность ворсинок и контроль патогенов для превосходного усвоения питательных веществ и производства животных.',
    products: [{ name: 'Turbo Grow', modal: 'turbo-grow' }],
  },
  {
    key: 'immunity',
    label: lang === 'EN' ? 'Immunity' : lang === 'AZ' ? 'İmmunitet' : 'Иммунитет',
    Icon: Shield,
    color: '#1a9952',
    glow: 'rgba(26,153,82,0.6)',
    desc: lang === 'EN' ? 'Antibody titer elevation, innate immune activation and vaccine response enhancement protocols.' : lang === 'AZ' ? 'Antikor titrinin yüksəldilməsi, doğal immun aktivasyonu və peyvənd cavabı güçləndirilməsi protokolları.' : 'Повышение уровня антител, активация врождённого иммунитета и протоколы усиления вакцинного ответа.',
    products: [{ name: 'MilQ', modal: 'milq' }],
  },
  {
    key: 'lactation',
    label: lang === 'EN' ? 'Lactation' : lang === 'AZ' ? 'Laktasyon' : 'Лактация',
    Icon: Milk,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    desc: lang === 'EN' ? 'Optimized nutrition for superior milk production, composition and butterfat enhancement in dairy herds.' : lang === 'AZ' ? 'Süt sürülərində yüksək dərəcəli süd istehsalı, tərkibi və yağ artırılması üçün optimallaşdırılmış qidalanma.' : 'Оптимизированное питание для превосходного производства молока, улучшения состава и содержания молочного жира в молочных стадах.',
    products: [{ name: 'MilQ', modal: 'milq' }],
  },
  {
    key: 'liver-support',
    label: lang === 'EN' ? 'Liver Support' : lang === 'AZ' ? 'Qaraciyər Dəstəyi' : 'Поддержка Печени',
    Icon: Heart,
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.5)',
    desc: lang === 'EN' ? 'Hepatoprotective silymarin complex and detoxification support for metabolic health and performance.' : lang === 'AZ' ? 'Metabolik sağlıq və performans üçün hepatoprotektiv silimarin kompleksi və detoksikasyon dəstəyi.' : 'Гепатопротекторный комплекс силимарина и поддержка детоксикации для метаболического здоровья и производства.',
    products: [{ name: 'MilQ', modal: 'milq' }],
  },
  {
    key: 'nagp',
    label: 'NAGP',
    Icon: FlaskConical,
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.5)',
    desc: lang === 'EN' ? 'N-Acetyl Glucosamine Peptide complex for intestinal mucosal barrier reinforcement and gut integrity.' : lang === 'AZ' ? 'Bağırsaq mukoza maneə güçləndirilməsi və həzm sistemi bütövlüyü üçün N-Asetil Glyukosamiq Peptid kompleksi.' : 'Комплекс N-ацетил глюкозамина для укрепления кишечного слизистого барьера и целостности ЖКТ.',
    products: [{ name: 'Turbo Grow', modal: 'turbo-grow' }],
  },
  {
    key: 'respiratory',
    label: lang === 'EN' ? 'Respiratory System Support' : lang === 'AZ' ? 'Tənəffüs Sistemi Dəstəyi' : 'Поддержка Дыхательной Системы',
    Icon: Wind,
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.5)',
    desc: lang === 'EN' ? 'Mucolytic essential oils and bronchodilatory phytogenics for clear airway maintenance and respiratory health.' : lang === 'AZ' ? 'Aydın tənəffüs yolu saxlanılması və tənəffüs sağlığı üçün mukolitik əssensial yağlar və bronkodilatator fitojenik maddələr.' : 'Муколитические эфирные масла и бронходилатирующие фитогены для поддержания чистоты дыхательных путей и здоровья дыхательной системы.',
    products: [{ name: 'Aromax® Dry', modal: 'aromax-dry' }],
  },
  {
    key: 'milk-replacers',
    label: lang === 'EN' ? 'Milk Replacers' : lang === 'AZ' ? 'Süt Əvəzləyicilər' : 'Заменители Молока',
    Icon: Milk,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    desc: lang === 'EN' ? 'Foudeh premium calf milk replacers — Imperial, Unique, Milk Plus, and Fresh Start — formulated for optimal growth, immunity and transition from colostrum.' : lang === 'AZ' ? 'Foudeh premium buznuq süd əvəzləyicilər — Imperial, Unique, Milk Plus və Fresh Start — optimal böyümə, immunitet və kolostrum keçişi üçün formulə edilmişdir.' : 'Премиум заменители молока Foudeh для телят — Imperial, Unique, Milk Plus и Fresh Start — разработаны для оптимального роста, иммунитета и перехода с молозива.',
    products: [{ name: 'View All Milk Replacers', modal: 'milk-replacers' }],
  },
];

function CategoryCard({ cat, isHovered, onHover, onLeave, isLocked, onLock }) {
  const { Icon } = cat;
  const isActive = isHovered === cat.key || isLocked === cat.key;
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => onHover(cat.key)}
      onMouseLeave={onLeave}
      onClick={() => onLock(cat.key)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center cursor-pointer w-full"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${cat.color}28, ${cat.color}10)`
          : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${isActive ? cat.color : 'rgba(255,255,255,0.12)'}`,
        boxShadow: isActive
          ? `0 0 20px ${cat.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 2px 8px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}08)`,
          border: `1px solid ${cat.color}45`,
          boxShadow: isActive ? `0 0 14px ${cat.glow}` : `0 0 6px ${cat.glow}`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: cat.color, filter: `drop-shadow(0 0 4px ${cat.color})` }} />
      </div>
      <span className="font-orbitron text-[9px] font-bold tracking-wider text-white leading-tight">
        {cat.label}
      </span>
    </motion.button>
  );
}

export default function CattleFeedModal({ open, onClose }) {
  const { lang } = useLang();
  const FEED_CATEGORIES = getFeedCategoriesData(lang);
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [aromaxDryCattleOpen, setAromaxDryCattleOpen] = useState(false);
  const [mouldGuardOpen, setMouldGuardOpen] = useState(false);
  const [toxiGuardOpen, setToxiGuardOpen] = useState(false);
  const [turboGrowOpen, setTurboGrowOpen] = useState(false);
  const [milqOpen, setMilqOpen] = useState(false);
  const [milkReplacersOpen, setMilkReplacersOpen] = useState(false);

  const handleProductClick = (modalKey) => {
    if (modalKey === 'aromax-dry') setAromaxDryCattleOpen(true);
    if (modalKey === 'mould-guard') setMouldGuardOpen(true);
    if (modalKey === 'toxi-guard') setToxiGuardOpen(true);
    if (modalKey === 'turbo-grow') setTurboGrowOpen(true);
    if (modalKey === 'milq') setMilqOpen(true);
    if (modalKey === 'milk-replacers') setMilkReplacersOpen(true);
  };

  const handleLock = (catKey) => {
    setLocked(locked === catKey ? null : catKey);
  };

  const handleClose = () => {
    setHovered(null);
    setLocked(null);
    onClose();
  };

  return (
    <>
    <AromaxDryCattleModal open={aromaxDryCattleOpen} onClose={() => setAromaxDryCattleOpen(false)} />
    <MouldGuardDiamondModal open={mouldGuardOpen} onClose={() => setMouldGuardOpen(false)} />
    <ToxiGuardModal open={toxiGuardOpen} onClose={() => setToxiGuardOpen(false)} />
    <TurboGrowModal open={turboGrowOpen} onClose={() => setTurboGrowOpen(false)} />
    <MilQModal open={milqOpen} onClose={() => setMilqOpen(false)} />
    <CattleMilkReplacersModal open={milkReplacersOpen} onClose={() => setMilkReplacersOpen(false)} />
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(2,12,4,0.80)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(8,28,12,0.95) 0%, rgba(5,18,8,0.98) 100%)',
              border: '1px solid rgba(107,158,48,0.3)',
              boxShadow: '0 0 60px rgba(107,158,48,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(107,158,48,0.18)',
                background: 'rgba(107,158,48,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(107,158,48,0.18)',
                    border: '1.5px solid rgba(107,158,48,0.45)',
                    boxShadow: '0 0 14px rgba(107,158,48,0.4)',
                  }}
                >
                  <Activity className="w-4 h-4" style={{ color: '#6B9E30', filter: 'drop-shadow(0 0 5px #6B9E30)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    {lang === 'EN' ? 'CATTLE · FEED' : lang === 'AZ' ? 'QARAMAL · YEM' : 'КРС · КОРМ'}
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(136,184,74,0.55)' }}>
                    {lang === 'EN' ? '9 NUTRITION CATEGORIES' : lang === 'AZ' ? '9 QİDALANDIRMA KATEQORİYASI' : '9 КАТЕГОРИЙ ПИТАНИЯ'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
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

              {/* Category grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
                {FEED_CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.key}
                    cat={cat}
                    isHovered={hovered}
                    onHover={setHovered}
                    onLeave={() => setHovered(null)}
                    isLocked={locked}
                    onLock={handleLock}
                  />
                ))}
              </div>

              {/* Hint when nothing hovered/locked */}
              <AnimatePresence mode="wait">
                {!hovered && !locked ? (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-3"
                  >
                    <span className="font-mono text-[10px] tracking-[4px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {lang === 'EN' ? '↑ HOVER A CATEGORY TO EXPLORE PRODUCTS' : lang === 'AZ' ? '↑ KATEQORİYA ÜZƏRINDƏ HOVER EDİN MƏHSULLARI ARAŞDIRMAQ ÜÇÜN' : '↑ НАВЕДИТЕ НА КАТЕГОРИЮ ДЛЯ ИЗУЧЕНИЯ ПРОДУКТОВ'}
                    </span>
                  </motion.div>
                ) : (
                  /* Lower Solutions Panel */
                  <motion.div
                    key={locked || hovered}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl p-5"
                    style={{
                      background: `linear-gradient(135deg, ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).color}10, ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).color}04)`,
                      border: `1px solid ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).color}35`,
                      boxShadow: `0 0 30px ${FEED_CATEGORIES.find(c => c.key === (locked || hovered)).glow}`,
                    }}
                  >
                    {(() => {
                      const activeCat = FEED_CATEGORIES.find(c => c.key === (locked || hovered));
                      return (
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${activeCat.color}28, ${activeCat.color}0a)`,
                              border: `1.5px solid ${activeCat.color}55`,
                              boxShadow: `0 0 20px ${activeCat.glow}`,
                            }}
                          >
                            <activeCat.Icon className="w-7 h-7" style={{ color: activeCat.color, filter: `drop-shadow(0 0 8px ${activeCat.color})` }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-orbitron text-base font-bold text-white tracking-wider mb-2">
                              {activeCat.label}
                            </div>
                            <p className="font-inter text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                              {activeCat.desc}
                            </p>
                            {activeCat.products && activeCat.products.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {activeCat.products.map((p) => (
                                  <motion.div
                                    key={p.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleProductClick(p.modal)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer"
                                    style={{
                                      background: `linear-gradient(135deg, ${activeCat.color}20, ${activeCat.color}08)`,
                                      border: `1px solid ${activeCat.color}45`,
                                      boxShadow: `0 0 8px ${activeCat.glow}`,
                                    }}
                                  >
                                    <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: activeCat.color }} />
                                    <span className="font-orbitron text-[10px] font-bold tracking-widest whitespace-nowrap" style={{ color: activeCat.color }}>
                                      {p.name}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}