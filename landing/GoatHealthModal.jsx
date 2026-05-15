import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Baby, Droplets } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#fbbf24';

const getProducts = (lang) => [
  {
    key: 'kid-health',
    name: lang === 'EN' ? 'Kid Health Start' : lang === 'AZ' ? 'Keçi Yavrusu Sağlığı Başlanğıcı' : 'Здоровье Козленка в Начале',
    icon: Baby,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    desc: lang === 'EN' ? 'Colostrum management and neonatal immunity protocols for optimal kid survival — ensures passive immunity transfer and early gut colonization.' : lang === 'AZ' ? 'Kolostrum idarəçiliyi və keçi yavrusu optimal sağ qalması üçün yeni doğulmuş immunitet protokolları — passiv immunitet köçürülməsini və erkən bağırsaq kolonizasiyasını təmin edir.' : 'Управление молозивом и протоколы неонатального иммунитета для оптимального выживания козленка — обеспечивает передачу пассивного иммунитета и раннюю колонизацию кишечника.',
  },
  {
    key: 'mastitis',
    name: lang === 'EN' ? 'Mastitis Control' : lang === 'AZ' ? 'Mastit Nəzarəti' : 'Контроль Мастита',
    icon: Droplets,
    color: '#fde68a',
    glow: 'rgba(253,230,138,0.5)',
    desc: lang === 'EN' ? 'Udder health support and somatic cell count reduction in dairy goats — botanical teat dipping solutions and supportive immune nutrition.' : lang === 'AZ' ? 'Süt keçilərində dama sağlığı dəstəyi və somatik hüceyrə sayının azaldılması — botanik emçək daldırma həlləri və dəstəkləyici immun qidalanma.' : 'Поддержка здоровья вымени и снижение количества соматических клеток у молочных коз — растительные растворы для обработки сосков и поддерживающее иммунное питание.',
  },
];

export default function GoatHealthModal({ open, onClose }) {
  const { lang } = useLang();
  const PRODUCTS = getProducts(lang);
  return (
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
              background: 'linear-gradient(145deg, rgba(12,8,3,0.97) 0%, rgba(8,5,2,0.99) 100%)',
              border: `1px solid ${COLOR}44`,
              boxShadow: `0 0 60px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${COLOR}28`, border: `1.5px solid ${COLOR}55`, boxShadow: `0 0 14px ${COLOR}55` }}
                >
                  <Heart className="w-4 h-4" style={{ color: COLOR, filter: `drop-shadow(0 0 5px ${COLOR})` }} />
                </div>
                <div>
                   <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">{lang === 'EN' ? 'HEALTH SOLUTIONS' : lang === 'AZ' ? 'SAĞLAMLIQ HƏLLƏRI' : 'РЕШЕНИЯ ДЛЯ ЗДОРОВЬЯ'}</div>
                   <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>
                     {lang === 'EN' ? 'CAPRINE · GOAT HEALTH PRODUCTS' : lang === 'AZ' ? 'KEÇİ · KEÇİ SAĞLAMLIQ MƏHSULLARI' : 'КОЗЫ · ПРОДУКТЫ ДЛЯ ЗДОРОВЬЯ КОЗ'}
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
              {PRODUCTS.map((product, i) => {
                const PIcon = product.icon;
                return (
                  <motion.div
                    key={product.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl p-4"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}0d, ${product.color}05)`,
                      border: `1px solid ${product.color}28`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${product.color}22`, border: `1px solid ${product.color}40`, boxShadow: `0 0 10px ${product.glow}` }}
                      >
                        <PIcon className="w-4 h-4" style={{ color: product.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-orbitron text-sm font-bold mb-1" style={{ color: product.color }}>{product.name}</div>
                        <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{product.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}