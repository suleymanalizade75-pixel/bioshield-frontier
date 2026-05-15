import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Egg, Activity, Thermometer, Shield, Droplets,
  FlaskConical, Zap, Wind, Sparkles, ChevronRight, Heart
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import AromaxModal from './AromaxModal';
import ZincotinModal from './ZincotinModal';
import TanniFitPlusModal from './TanniFitPlusModal';
import CattleTanniFitPlusModal from './CattleTanniFitPlusModal';
import RenalCleanerModal from './RenalCleanerModal';
import MetavolinHerbalModal from './MetavolinHerbalModal';
import NovoVitalModal from './NovoVitalModal';
import OregoPlusModal from './OregoPlusModal';
import CalciumTopModal from './CalciumTopModal';
import EarlyCareModal from './EarlyCareModal';

const getHealthCategories = (lang) => [
  {
    key: 'early-care',
    label: lang === 'EN' ? 'Early Care' : lang === 'AZ' ? 'Erkən Qayğı' : 'Ранний Уход',
    Icon: Heart,
    color: '#88B84A',
    glow: 'rgba(136,184,74,0.5)',
    desc: lang === 'EN' ? 'Colostrum support, neonatal immunity & optimal calf development protocols.' : lang === 'AZ' ? 'Kolostrum dəstəyi, yeni doğulmuş immunitet və optimal dana inkişaf protokolları.' : 'Поддержка молозива, неонатальный иммунитет и оптимальные протоколы развития телят.',
    products: ['TanniFit Plus Liquid'],
  },
  {
    key: 'fertility',
    label: lang === 'EN' ? 'Fertility' : lang === 'AZ' ? 'Fertillilk' : 'Фертильность',
    Icon: Egg,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    desc: lang === 'EN' ? 'Reproductive performance, conception rates & herd efficiency optimization.' : lang === 'AZ' ? 'Reproduktiv performans, konsepsiya dərəcələri və sürü effektivliyinin optimallaşdırılması.' : 'Репродуктивная производительность, уровень зачатия и оптимизация эффективности стада.',
    products: ['Zincotin®'],
  },
  {
    key: 'gut',
    label: lang === 'EN' ? 'Gut Health' : lang === 'AZ' ? 'Həzm Sağlığı' : 'Здоровье ЖКТ',
    Icon: Activity,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    desc: lang === 'EN' ? 'Microbiome balance, villi integrity & pathogen control for superior nutrient absorption.' : lang === 'AZ' ? 'Mikrobiom balansı, vilya bütövlüyü və patogen kontrolü üstün qida absorbsiyası üçün.' : 'Баланс микробиома, целостность ворсинок и контроль патогенов для лучшего усвоения питательных веществ.',
    products: ['TanniFit Plus', 'TanniFit Plus Liquid'],
  },
  {
    key: 'immunity',
    label: lang === 'EN' ? 'Immunity' : lang === 'AZ' ? 'İmmunitet' : 'Иммунитет',
    Icon: Shield,
    color: '#1a9952',
    glow: 'rgba(26,153,82,0.6)',
    desc: lang === 'EN' ? 'Antibody titer elevation, innate immune activation & vaccine response enhancement.' : lang === 'AZ' ? 'Antikor titri yüksəltməsi, doğuştan immun aktivasiya və vaksin cavabı güçləndirmə.' : 'Повышение титра антител, активация врождённого иммунитета и улучшение ответа на вакцину.',
    products: ['Zincotin®'],
  },
  {
    key: 'kidney',
    label: lang === 'EN' ? 'Kidney Support' : lang === 'AZ' ? 'Böbrek Dəstəyi' : 'Поддержка Почек',
    Icon: Droplets,
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.5)',
    desc: lang === 'EN' ? 'Uric acid flushing, nephroprotective botanicals & electrolyte-kidney axis balance.' : lang === 'AZ' ? 'Ürik asid təmizləmə, nefroprotektiv botanikalar və elektrolit-böbrek oxu balansı.' : 'Выведение мочевой кислоты, нефропротекторные растения и баланс электролит-почечной оси.',
    products: ['Renal Cleaner'],
  },
  {
    key: 'liver',
    label: lang === 'EN' ? 'Liver Support' : lang === 'AZ' ? 'Qaraciyər Dəstəyi' : 'Поддержка Печени',
    Icon: Heart,
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.5)',
    desc: lang === 'EN' ? 'Hepatoprotective silymarin complex, choline & methionine for detoxification support.' : lang === 'AZ' ? 'Hepatoprotektiv silimarın kompleksi, xolin və metionin detoksifikasiya dəstəyi üçün.' : 'Гепатопротекторный комплекс силимарина, холин и метионин для поддержки детоксикации.',
    products: ['Metavolin Herbal®'],
  },
  {
    key: 'nagp',
    label: 'NAGP',
    Icon: FlaskConical,
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.5)',
    desc: lang === 'EN' ? 'N-Acetyl Glucosamine Peptide complex for intestinal mucosal barrier reinforcement.' : lang === 'AZ' ? 'N-Asetil Glyukosamiq Peptid kompleksi həzm traktı mukoza maneə güçləndirilməsi üçün.' : 'Комплекс N-ацетил глюкозамина для укрепления кишечного слизистого барьера.',
    products: ['NovoVital', 'OregoPlus®'],
  },
  {
    key: 'recovery',
    label: lang === 'EN' ? 'Quick Recovery' : lang === 'AZ' ? 'Cəld Bərpa' : 'Быстрое Восстановление',
    Icon: Zap,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    desc: lang === 'EN' ? 'Rapid post-disease restoration with B-vitamin complex, amino acids & energy boosters.' : lang === 'AZ' ? 'B-vitamin kompleksi, amino turşuları və enerji artırıcıları ilə cəld xəstəlik sonrası bərpa.' : 'Быстрое восстановление после болезни с B-комплексом, аминокислотами и усилителями энергии.',
    products: ['Calcium Top'],
  },
  {
    key: 'respiratory',
    label: lang === 'EN' ? 'Respiratory' : lang === 'AZ' ? 'Tənəffüs Sistemi' : 'Дыхательная Система',
    Icon: Wind,
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.5)',
    desc: lang === 'EN' ? 'Mucolytic essential oils & bronchodilatory phytogenics for clear airway maintenance.' : lang === 'AZ' ? 'Mukolotik əssensial yağlar və bronxodilator fitojenikalar aydın airway saxlanması üçün.' : 'Муколитические эфирные масла и бронходилатирующие фитогенные вещества для здоровых дыхательных путей.',
    products: ['Aromax®'],
  },
  {
    key: 'skin',
    label: lang === 'EN' ? 'Skin Quality' : lang === 'AZ' ? 'Dəri Keyfiyyəti' : 'Качество Кожи',
    Icon: Sparkles,
    color: '#f0abfc',
    glow: 'rgba(240,171,252,0.5)',
    desc: lang === 'EN' ? 'Biotin, zinc & keratin precursors for superior coat quality and skin barrier health.' : lang === 'AZ' ? 'Biotin, sink və keratin əcdadları üstün geyim keyfiyyəti və dəri maneə sağlığı üçün.' : 'Биотин, цинк и предшественники кератина для качества шерсти и здоровья кожного барьера.',
    products: ['Zincotin®'],
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

export default function CattleHealthModal({ open, onClose }) {
  const { lang } = useLang();
  const HEALTH_CATEGORIES = getHealthCategories(lang);
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [aromaxOpen, setAromaxOpen] = useState(false);
  const [zincotinOpen, setZincotinOpen] = useState(false);
  const [tanniFitOpen, setTanniFitOpen] = useState(false);
  const [cattleTanniFitOpen, setCattleTanniFitOpen] = useState(false);
  const [renalCleanerOpen, setRenalCleanerOpen] = useState(false);
  const [metavolinHerbalOpen, setMetavolinHerbalOpen] = useState(false);
  const [novoVitalOpen, setNovoVitalOpen] = useState(false);
  const [oregoPlusOpen, setOregoPlusOpen] = useState(false);
  const [calciumTopOpen, setCalciumTopOpen] = useState(false);
  const [earlierCareOpen, setEarlierCareOpen] = useState(false);

  const handleLock = (catKey) => {
    setLocked(locked === catKey ? null : catKey);
  };

  const handleProductClick = (productName) => {
    if (productName === 'Aromax®') setAromaxOpen(true);
    else if (productName === 'Zincotin®') setZincotinOpen(true);
    else if (productName === 'TanniFit Plus') setTanniFitOpen(true);
    else if (productName === 'TanniFit Plus Liquid') setCattleTanniFitOpen(true);
    else if (productName === 'Renal Cleaner') setRenalCleanerOpen(true);
    else if (productName === 'Metavolin Herbal®') setMetavolinHerbalOpen(true);
    else if (productName === 'NovoVital') setNovoVitalOpen(true);
    else if (productName === 'OregoPlus®') setOregoPlusOpen(true);
    else if (productName === 'Calcium Top') setCalciumTopOpen(true);
    else if (productName === 'TanniFit Plus Liquid') setEarlierCareOpen(true);
    setLocked(null);
  };

  const handleClose = () => {
    setHovered(null);
    setLocked(null);
    onClose();
  };

  return (
    <>
    <AromaxModal open={aromaxOpen} onClose={() => setAromaxOpen(false)} />
    <ZincotinModal open={zincotinOpen} onClose={() => setZincotinOpen(false)} />
    <TanniFitPlusModal open={tanniFitOpen} onClose={() => setTanniFitOpen(false)} />
    <CattleTanniFitPlusModal open={cattleTanniFitOpen} onClose={() => setCattleTanniFitOpen(false)} />
    <RenalCleanerModal open={renalCleanerOpen} onClose={() => setRenalCleanerOpen(false)} />
    <MetavolinHerbalModal open={metavolinHerbalOpen} onClose={() => setMetavolinHerbalOpen(false)} />
    <NovoVitalModal open={novoVitalOpen} onClose={() => setNovoVitalOpen(false)} />
    <OregoPlusModal open={oregoPlusOpen} onClose={() => setOregoPlusOpen(false)} />
    <CalciumTopModal open={calciumTopOpen} onClose={() => setCalciumTopOpen(false)} />
    <EarlyCareModal open={earlierCareOpen} onClose={() => setEarlierCareOpen(false)} />
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
                  <Shield className="w-4 h-4" style={{ color: '#6B9E30', filter: 'drop-shadow(0 0 5px #6B9E30)' }} />
                </div>
                <div>
                   <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                     {lang === 'EN' ? 'CATTLE · HEALTH' : lang === 'AZ' ? 'QARAMAL · SAĞLAMLIQ' : 'КРС · ЗДОРОВЬЕ'}
                   </div>
                   <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(136,184,74,0.55)' }}>
                     {lang === 'EN' ? '10 SOLUTION CATEGORIES' : lang === 'AZ' ? '10 HƏLL KATEQORİYASI' : '10 КАТЕГОРИЙ РЕШЕНИЙ'}
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

              {/* 5×2 category grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-5">
                {HEALTH_CATEGORIES.map((cat) => (
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
                      background: `linear-gradient(135deg, ${HEALTH_CATEGORIES.find(c => c.key === (locked || hovered)).color}10, ${HEALTH_CATEGORIES.find(c => c.key === (locked || hovered)).color}04)`,
                      border: `1px solid ${HEALTH_CATEGORIES.find(c => c.key === (locked || hovered)).color}35`,
                      boxShadow: `0 0 30px ${HEALTH_CATEGORIES.find(c => c.key === (locked || hovered)).glow}`,
                    }}
                  >
                    {(() => {
                      const activeCat = HEALTH_CATEGORIES.find(c => c.key === (locked || hovered));
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
                            {/* Product chips */}
                            {activeCat.products && activeCat.products.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {activeCat.products.map((p) => (
                                  <motion.div
                                    key={p}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleProductClick(p)}
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