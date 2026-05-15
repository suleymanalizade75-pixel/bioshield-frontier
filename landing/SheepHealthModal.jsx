import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Shield, Wind } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#a78bfa';

const getProducts = (lang) => [
  {
    key: 'immunity',
    name: lang === 'EN' ? 'Immunity Support' : lang === 'AZ' ? 'İmmunitet Dəstəyi' : 'Поддержка Иммунитета',
    icon: Shield,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    desc: lang === 'EN' ? 'Vitamin E & selenium complex for enhanced immune response in ewes and lambs — supports antibody production and reduces oxidative stress.' : lang === 'AZ' ? 'Dişi qoyunlar və quzularda güçləndirilmiş immun cavabı üçün E vitamini və selenyum kompleksi — antikor istehsalını dəstəkləyir və oksidativ stressi azaldır.' : 'Комплекс витамина E и селена для повышения иммунного ответа у маток и ягнят — поддерживает производство антител и снижает окислительный стресс.',
  },
  {
    key: 'respiratory',
    name: lang === 'EN' ? 'Respiratory Care' : lang === 'AZ' ? 'Tənəffüs Qayğısı' : 'Уход за Дыхательной Системой',
    icon: Wind,
    color: '#c4b5fd',
    glow: 'rgba(196,181,253,0.5)',
    desc: lang === 'EN' ? 'Phytogenic blend for pneumonia prevention and lung health in sheep — essential oils and botanical extracts to maintain clear airways.' : lang === 'AZ' ? 'Qoyunlarda pneymonia profilaksiyası və ağciyər sağlığı üçün fitojen qarışığı — aydın tənəffüs yollarını saxlamaq üçün əsas yağlar və botanik ekstraktlar.' : 'Фитогенная смесь для профилактики пневмонии и здоровья легких у овец — эфирные масла и растительные экстракты для чистоты дыхательных путей.',
  },
];

export default function SheepHealthModal({ open, onClose }) {
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
              background: 'linear-gradient(145deg, rgba(8,5,20,0.97) 0%, rgba(5,3,15,0.99) 100%)',
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
                     {lang === 'EN' ? 'OVINE · SHEEP HEALTH PRODUCTS' : lang === 'AZ' ? 'QOYUN · QOYUN SAĞLAMLIQ MƏHSULLARI' : 'ОВЦЫ · ПРОДУКТЫ ДЛЯ ЗДОРОВЬЯ ОВЕЦ'}
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