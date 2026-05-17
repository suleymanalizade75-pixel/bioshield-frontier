import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Egg, Activity, Thermometer, Shield, Droplets,
  FlaskConical, Zap, Wind, Sparkles, ChevronRight, Heart
} from 'lucide-react';
import CalDPhosModal from './CalDPhosModal';
import SmoothProModal from './SmoothProModal';
import LegsAndEggsModal from './LegsAndEggsModal';
import EHydrolyteModal from './EHydrolyteModal';
import TurboFluidModal from './TurboFluidModal';
import MineralForteModal from './MineralForteModal';
import VitaminESEModal from './VitaminESEModal';
import VitaminAD3EModal from './VitaminAD3EModal';
import { useLang } from '@/lib/i18n';

const getFormCategories = (lang) => [
  {
    key: 'acidifiers',
    label: lang === 'EN' ? 'Acidifiers' : lang === 'AZ' ? 'Asidifikatorlar' : 'Ацидификаторы',
    Icon: FlaskConical,
    color: '#f87171',
    glow: 'rgba(248,113,113,0.5)',
    desc: lang === 'EN'
      ? 'Water hygiene solutions for pathogen control and bacterial contamination protection.'
      : lang === 'AZ'
      ? 'Patogen nəzarəti və bakterial çirklənmə qorunması üçün su gigiyenası həlləri.'
      : 'Решения для гигиены воды по контролю патогенов и защите от бактериального загрязнения.',
    products: ['X-Cid Plus'],
  },
  {
    key: 'carcass-quality',
    label: lang === 'EN' ? 'Carcass Quality' : lang === 'AZ' ? 'Karkas Keyfiyyəti' : 'Качество Туши',
    Icon: Activity,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: lang === 'EN'
      ? 'Solutions for superior meat quality, skin integrity and minimal processing rejections.'
      : lang === 'AZ'
      ? 'Üstün ət keyfiyyəti, dəri bütövlüyü və minimal emal reddləri üçün həllər.'
      : 'Решения для превосходного качества мяса, целостности кожи и минальных отказов при переработке.',
    products: ['Smooth Pro'],
  },
  {
    key: 'eggshell-quality',
    label: lang === 'EN' ? 'Eggshell Quality' : lang === 'AZ' ? 'Yumurta Qabığı Keyfiyyəti' : 'Качество Яичной Скорлупы',
    Icon: Egg,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    desc: lang === 'EN'
      ? 'Calcium, phosphorus & vitamin D3 for robust shell integrity and hatchability.'
      : lang === 'AZ'
      ? 'Möhkəm qabıq bütövlüyü və çıxış qabiliyyəti üçün Kalsium, Fosfor & D3 Vitamini.'
      : 'Кальций, фосфор & витамин D3 для прочной целостности скорлупы и выводимости.',
    products: ['Cal D Phos®'],
  },
  {
    key: 'heat-stress',
    label: lang === 'EN' ? 'Heat Stress' : lang === 'AZ' ? 'İstilik Stresi' : 'Тепловой Стресс',
    Icon: Thermometer,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    desc: lang === 'EN'
      ? 'Electrolyte & antioxidant support for thermoregulation during high-temperature periods.'
      : lang === 'AZ'
      ? 'Yüksək temperatur dövrlərində termorequlyasiya üçün elektrolit & antioksidant dəstəyi.'
      : 'Электролитная & антиоксидантная поддержка для терморегуляции в периоды высоких температур.',
    products: ['E-Hydrolyte + C Pro'],
  },
  {
    key: 'pathogen-pressure',
    label: lang === 'EN' ? 'Pathogen Pressure' : lang === 'AZ' ? 'Patogen Təzyiqi' : 'Патогенное Давление',
    Icon: Shield,
    color: '#1a9952',
    glow: 'rgba(26,153,82,0.6)',
    desc: lang === 'EN'
      ? 'Antimicrobial botanicals & immune modulators for disease resistance.'
      : lang === 'AZ'
      ? 'Xəstəliyə qarşı müqavimət üçün antimikrob botanik bitkilər & immun modulatorlar.'
      : 'Антимикробные ботаники & иммунные модуляторы для устойчивости к болезням.',
    products: ['X-Cid Plus'],
  },
  {
    key: 'strong-bones',
    label: lang === 'EN' ? 'Strong Bones' : lang === 'AZ' ? 'Güclü Sümüklər' : 'Крепкие Кости',
    Icon: Heart,
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.5)',
    desc: lang === 'EN'
      ? 'Mineral complexes & collagen precursors for skeletal strength and bone integrity.'
      : lang === 'AZ'
      ? 'İskelet gücü və sümük bütövlüyü üçün mineral komplekslər & kollagen prekursorları.'
      : 'Минеральные комплексы & предшественники коллагена для прочности скелета и целостности костей.',
    products: ['Cal D Phos®'],
  },
  {
    key: 'vitamin-mineral-amino',
    label: lang === 'EN' ? 'Vit/Min/Amino Acids' : lang === 'AZ' ? 'Vit/Min/Amin Turşuları' : 'Вит/Мин/Аминокислоты',
    Icon: Zap,
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.5)',
    desc: lang === 'EN'
      ? 'Balanced micronutrient & amino acid profile for metabolic optimization.'
      : lang === 'AZ'
      ? 'Metabolik optimallaşdırma üçün balanslaşdırılmış mikroqida & amin turşusu profili.'
      : 'Сбалансированный профиль микронутриентов & аминокислот для метаболической оптимизации.',
    products: ['Turbo Fluid', 'Mineral Forte', 'Vitamin E+Se', 'Vitamin AD3E'],
  },
];

const getLabels = (lang) => ({
  headerTitle: lang === 'EN' ? 'POULTRY · FARM' : lang === 'AZ' ? 'QUŞÇULUQ · FERMA' : 'ПТИЦЕВОДСТВО · ФЕРМА',
  headerSub: lang === 'EN' ? '7 FORMULATION CATEGORIES' : lang === 'AZ' ? '7 FORMUL KATEQORİYASI' : '7 КАТЕГОРИЙ ФОРМУЛЯЦИЙ',
  hint: lang === 'EN' ? '↑ HOVER A CATEGORY TO EXPLORE PRODUCTS' : lang === 'AZ' ? '↑ MƏHSULLARI KƏŞF ETMƏK ÜÇÜN KATEQORİYA ÜZƏRINDƏN KEÇİN' : '↑ НАВЕДИТЕ НА КАТЕГОРИЮ ДЛЯ ПРОСМОТРА ПРОДУКТОВ',
});

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

export default function PoultryFormModal({ open, onClose }) {
  const { lang } = useLang();
  const FORM_CATEGORIES = getFormCategories(lang);
  const labels = getLabels(lang);

  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [calDPhosOpen, setCalDPhosOpen] = useState(false);
  const [smoothProOpen, setSmoothProOpen] = useState(false);
  const [legsAndEggsOpen, setLegsAndEggsOpen] = useState(false);
  const [eHydrolyteOpen, setEHydrolyteOpen] = useState(false);
  const [turboFluidOpen, setTurboFluidOpen] = useState(false);
  const [mineralForteOpen, setMineralForteOpen] = useState(false);
  const [vitaminESEOpen, setVitaminESEOpen] = useState(false);
  const [vitaminAD3EOpen, setVitaminAD3EOpen] = useState(false);

  const handleLock = (catKey) => {
    setLocked(locked === catKey ? null : catKey);
  };

  const handleProductClick = (productName) => {
    if (productName === 'X-Cid Plus') setCalDPhosOpen(true);
    else if (productName === 'Smooth Pro') setSmoothProOpen(true);
    else if (productName === 'Cal D Phos®') setLegsAndEggsOpen(true);
    else if (productName === 'E-Hydrolyte + C Pro') setEHydrolyteOpen(true);
    else if (productName === 'Turbo Fluid') setTurboFluidOpen(true);
    else if (productName === 'Mineral Forte') setMineralForteOpen(true);
    else if (productName === 'Vitamin E+Se') setVitaminESEOpen(true);
    else if (productName === 'Vitamin AD3E') setVitaminAD3EOpen(true);
    setLocked(null);
  };

  const handleClose = () => {
    setHovered(null);
    setLocked(null);
    onClose();
  };

  return (
    <>
    <CalDPhosModal open={calDPhosOpen} onClose={() => setCalDPhosOpen(false)} />
    <SmoothProModal open={smoothProOpen} onClose={() => setSmoothProOpen(false)} />
    <LegsAndEggsModal open={legsAndEggsOpen} onClose={() => setLegsAndEggsOpen(false)} />
    <EHydrolyteModal open={eHydrolyteOpen} onClose={() => setEHydrolyteOpen(false)} />
    <TurboFluidModal open={turboFluidOpen} onClose={() => setTurboFluidOpen(false)} />
    <MineralForteModal open={mineralForteOpen} onClose={() => setMineralForteOpen(false)} />
    <VitaminESEModal open={vitaminESEOpen} onClose={() => setVitaminESEOpen(false)} />
    <VitaminAD3EModal open={vitaminAD3EOpen} onClose={() => setVitaminAD3EOpen(false)} />
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
              border: '1px solid rgba(26,79,192,0.3)',
              boxShadow: '0 0 60px rgba(26,79,192,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(26,79,192,0.18)',
                background: 'rgba(26,79,192,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(26,79,192,0.18)',
                    border: '1.5px solid rgba(26,79,192,0.45)',
                    boxShadow: '0 0 14px rgba(26,79,192,0.4)',
                  }}
                >
                  <Zap className="w-4 h-4" style={{ color: '#1a4fc0', filter: 'drop-shadow(0 0 5px #1a4fc0)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    {labels.headerTitle}
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(26,79,192,0.55)' }}>
                    {labels.headerSub}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 mb-5">
                {FORM_CATEGORIES.map((cat) => (
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
                      {labels.hint}
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
                      background: `linear-gradient(135deg, ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).color}10, ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).color}04)`,
                      border: `1px solid ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).color}35`,
                      boxShadow: `0 0 30px ${FORM_CATEGORIES.find(c => c.key === (locked || hovered)).glow}`,
                    }}
                  >
                    {(() => {
                      const activeCat = FORM_CATEGORIES.find(c => c.key === (locked || hovered));
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
                                    key={p}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={(e) => { e.stopPropagation(); handleProductClick(p); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer"
                                    style={{
                                      background: `linear-gradient(135deg, ${activeCat.color}20, ${activeCat.color}08)`,
                                      border: `1px solid ${activeCat.color}45`,
                                      boxShadow: `0 0 8px ${activeCat.glow}`,
                                    }}
                                  >
                                    <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: activeCat.color }} />
                                    <span className="font-orbitron text-[10px] font-bold tracking-widest whitespace-nowrap" style={{ color: activeCat.color }}>
                                      {p}
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
