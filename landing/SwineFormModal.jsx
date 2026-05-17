import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Pill } from 'lucide-react';
import CalDPhosModal from './CalDPhosModal';
import SmoothProModal from './SmoothProModal';
import ProStartModal from './ProStartModal';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  headerTitle: lang === 'EN' ? 'SWINE · FARM' : lang === 'AZ' ? 'DONUZ · FERMA' : 'СВИНЬЯ · ФЕРМА',
  headerSub: lang === 'EN' ? '5 FARM CATEGORIES' : lang === 'AZ' ? '5 FERMA KATEQORİYASI' : '5 КАТЕГОРИЙ ФЕРМЫ',
  selectHint: lang === 'EN' ? '↑ SELECT A CATEGORY TO VIEW PRODUCTS' : lang === 'AZ' ? '↑ MƏHSULLARI GÖRMƏK ÜÇÜN KATEQORİYA SEÇİN' : '↑ ВЫБЕРИТЕ КАТЕГОРИЮ ДЛЯ ПРОСМОТРА ПРОДУКТОВ',

  categories: lang === 'EN'
    ? [
        {
          key: 'acidifiers',
          label: 'Acidifiers',
          color: '#f97316',
          glow: 'rgba(249,115,22,0.5)',
          desc: 'Organic acid blends to lower gut pH, reduce pathogen load, and improve feed conversion in swine.',
          products: [{ name: 'X-Cid Plus', modal: 'xcid-plus' }],
        },
        {
          key: 'carcass-quality',
          label: 'Carcass Quality',
          color: '#a78bfa',
          glow: 'rgba(167,139,250,0.5)',
          desc: 'Conjugated linoleic acid and targeted compounds for lean meat percentage improvement and superior carcass grading.',
          products: [{ name: 'Smooth Pro', modal: 'smooth-pro' }],
        },
        {
          key: 'early-care',
          label: 'Early Care',
          color: '#34d399',
          glow: 'rgba(52,211,153,0.5)',
          desc: 'Neonatal support and colostrum enhancement protocols for optimal piglet vitality and survival rates.',
          products: [{ name: 'Pro-Start', modal: 'pro-start' }],
        },
        {
          key: 'gut-health',
          label: 'Gut Health',
          color: '#38bdf8',
          glow: 'rgba(56,189,248,0.5)',
          desc: 'Microbiome balance, villi integrity and pathogen control for superior nutrient absorption and performance in swine.',
          products: [{ name: 'Pro-Start', modal: 'pro-start' }],
        },
        {
          key: 'pathogen-pressure',
          label: 'Pathogen Pressure',
          color: '#f87171',
          glow: 'rgba(248,113,113,0.5)',
          desc: 'Targeted antimicrobial and immune-modulatory solutions to reduce bacterial and viral pathogen burdens in herds.',
          products: [{ name: 'X-Cid Plus', modal: 'xcid-plus' }],
        },
      ]
    : lang === 'AZ'
    ? [
        {
          key: 'acidifiers',
          label: 'Turşulaşdırıcılar',
          color: '#f97316',
          glow: 'rgba(249,115,22,0.5)',
          desc: 'Donuzlarda bağırsaq pH-ını aşağı salmaq, patogen yükünü azaltmaq və yem çevrilməsini yaxşılaşdırmaq üçün üzvi turşu qarışıqları.',
          products: [{ name: 'X-Cid Plus', modal: 'xcid-plus' }],
        },
        {
          key: 'carcass-quality',
          label: 'Karkas Keyfiyyəti',
          color: '#a78bfa',
          glow: 'rgba(167,139,250,0.5)',
          desc: 'Yağsız ət faizinin artırılması və üstün karkas dərəcəsi üçün konjuge linol turşusu və hədəflənmiş birləşmələr.',
          products: [{ name: 'Smooth Pro', modal: 'smooth-pro' }],
        },
        {
          key: 'early-care',
          label: 'Erkən Qayğı',
          color: '#34d399',
          glow: 'rgba(52,211,153,0.5)',
          desc: 'Optimal körpə donuz canlılığı və sağ qalma nisbəti üçün neonatal dəstək və ağız südü gücləndirmə protokolları.',
          products: [{ name: 'Pro-Start', modal: 'pro-start' }],
        },
        {
          key: 'gut-health',
          label: 'Bağırsaq Sağlamlığı',
          color: '#38bdf8',
          glow: 'rgba(56,189,248,0.5)',
          desc: 'Donuzlarda üstün qida maddəsi udulması və performans üçün mikrobiom balansı, villus bütövlüyü və patogen nəzarəti.',
          products: [{ name: 'Pro-Start', modal: 'pro-start' }],
        },
        {
          key: 'pathogen-pressure',
          label: 'Patogen Təzyiqi',
          color: '#f87171',
          glow: 'rgba(248,113,113,0.5)',
          desc: 'Sürülərdə bakterial və viral patogen yükünü azaltmaq üçün hədəflənmiş antimikrob və immun-modulyator həllər.',
          products: [{ name: 'X-Cid Plus', modal: 'xcid-plus' }],
        },
      ]
    : [
        {
          key: 'acidifiers',
          label: 'Подкислители',
          color: '#f97316',
          glow: 'rgba(249,115,22,0.5)',
          desc: 'Смеси органических кислот для снижения pH кишечника, уменьшения патогенной нагрузки и улучшения конверсии корма у свиней.',
          products: [{ name: 'X-Cid Plus', modal: 'xcid-plus' }],
        },
        {
          key: 'carcass-quality',
          label: 'Качество Туши',
          color: '#a78bfa',
          glow: 'rgba(167,139,250,0.5)',
          desc: 'Конъюгированная линолевая кислота и целевые соединения для повышения доли постного мяса и улучшения сортности туши.',
          products: [{ name: 'Smooth Pro', modal: 'smooth-pro' }],
        },
        {
          key: 'early-care',
          label: 'Ранний Уход',
          color: '#34d399',
          glow: 'rgba(52,211,153,0.5)',
          desc: 'Неонатальная поддержка и протоколы обогащения молозива для оптимальной жизнеспособности и выживаемости поросят.',
          products: [{ name: 'Pro-Start', modal: 'pro-start' }],
        },
        {
          key: 'gut-health',
          label: 'Здоровье Кишечника',
          color: '#38bdf8',
          glow: 'rgba(56,189,248,0.5)',
          desc: 'Баланс микробиома, целостность ворсинок и контроль патогенов для улучшения всасывания питательных веществ и продуктивности свиней.',
          products: [{ name: 'Pro-Start', modal: 'pro-start' }],
        },
        {
          key: 'pathogen-pressure',
          label: 'Патогенная Нагрузка',
          color: '#f87171',
          glow: 'rgba(248,113,113,0.5)',
          desc: 'Целевые антимикробные и иммуномодулирующие решения для снижения бактериальной и вирусной патогенной нагрузки в стадах.',
          products: [{ name: 'X-Cid Plus', modal: 'xcid-plus' }],
        },
      ],
});

function CategoryCard({ cat, isHovered, onHover, onLeave, isLocked, onLock }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => onHover(cat.key)}
      onMouseLeave={onLeave}
      onClick={() => onLock(cat.key)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center cursor-pointer w-full"
      style={{
        background: isHovered === cat.key || isLocked === cat.key
          ? `linear-gradient(135deg, ${cat.color}28, ${cat.color}10)`
          : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${isHovered === cat.key || isLocked === cat.key ? cat.color : 'rgba(255,255,255,0.12)'}`,
        boxShadow: isHovered === cat.key || isLocked === cat.key
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
          boxShadow: isHovered === cat.key || isLocked === cat.key ? `0 0 14px ${cat.glow}` : `0 0 6px ${cat.glow}`,
        }}
      >
        <span className="text-lg">🐷</span>
      </div>
      <span className="font-orbitron text-[9px] font-bold tracking-wider text-white leading-tight">
        {cat.label}
      </span>
    </motion.button>
  );
}

export default function SwineFormModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);

  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [xcidPlusOpen, setXcidPlusOpen] = useState(false);
  const [smoothProOpen, setSmoothProOpen] = useState(false);
  const [proStartOpen, setProStartOpen] = useState(false);

  const handleLock = (catKey) => {
    setLocked(locked === catKey ? null : catKey);
  };

  const handleProductClick = (modalKey) => {
    if (modalKey === 'xcid-plus') setXcidPlusOpen(true);
    if (modalKey === 'smooth-pro') setSmoothProOpen(true);
    if (modalKey === 'pro-start') setProStartOpen(true);
  };

  const handleClose = () => {
    setHovered(null);
    setLocked(null);
    onClose();
  };

  return (
    <>
    <CalDPhosModal open={xcidPlusOpen} onClose={() => setXcidPlusOpen(false)} />
    <SmoothProModal open={smoothProOpen} onClose={() => setSmoothProOpen(false)} />
    <ProStartModal open={proStartOpen} onClose={() => setProStartOpen(false)} />
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
              border: '1px solid rgba(90,140,42,0.3)',
              boxShadow: '0 0 60px rgba(90,140,42,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(90,140,42,0.18)',
                background: 'rgba(90,140,42,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(90,140,42,0.18)',
                    border: '1.5px solid rgba(90,140,42,0.45)',
                    boxShadow: '0 0 14px rgba(90,140,42,0.4)',
                  }}
                >
                  <span className="text-lg">🐷</span>
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    {data.headerTitle}
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(90,140,42,0.55)' }}>
                    {data.headerSub}
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
                {data.categories.map((cat) => (
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

              {/* Solutions Panel */}
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
                      {data.selectHint}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={locked || hovered}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl p-5"
                    style={{
                      background: `linear-gradient(135deg, ${data.categories.find(c => c.key === (locked || hovered)).color}10, ${data.categories.find(c => c.key === (locked || hovered)).color}04)`,
                      border: `1px solid ${data.categories.find(c => c.key === (locked || hovered)).color}35`,
                      boxShadow: `0 0 30px ${data.categories.find(c => c.key === (locked || hovered)).glow}`,
                    }}
                  >
                    {(() => {
                      const activeCat = data.categories.find(c => c.key === (locked || hovered));
                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🐷</span>
                            <div className="font-orbitron text-lg font-bold text-white tracking-wider">
                              {activeCat.label}
                            </div>
                          </div>
                          <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
