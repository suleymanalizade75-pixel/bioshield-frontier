import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FlaskConical, Zap, Shield, Leaf, Settings } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const CONTENT = {
  EN: {
    subtitle: 'UNLOCK THE VALUE OF YOUR FEED',
    tagline: (
      <>
        <strong>AlphaGal<sup className="text-[8px]">TM</sup></strong> targets multiple antinutritional factors including <strong>α-galactooligosaccharides</strong> and <strong>arabinoxylans</strong>. This comprehensive enzyme solution is scientifically proven across a wide range of global production systems to help unlock more nutrients from the diet and deliver a stronger enzyme ROI.
      </>
    ),
    benefitsLabel: 'KEY BENEFITS',
    productsLabel: 'PRODUCT FORMS',
    tableHeaders: ['Product', 'Form', 'Recommended Use'],
    benefits: [
      { icon: FlaskConical, title: 'α-Galactooligosaccharides', desc: 'AlphaGal contains α-galactosidase to help digest soy α-galactooligosaccharides.', color: '#34d399' },
      { icon: Zap, title: 'Optimize Energy Availability', desc: 'AlphaGal has been demonstrated to significantly increase the availability of energy and protein in poultry diets.', color: '#fbbf24' },
      { icon: Shield, title: 'Support Bird Health', desc: 'Improved digestibility can help improve litter and footpad scores, supporting bird health and welfare.', color: '#38bdf8' },
      { icon: Settings, title: 'Flexible Options', desc: 'AlphaGal integrates seamlessly into your feeding system — available in dry and liquid forms for premixes, mash feeds, pelleting, or post-pellet spray.', color: '#a78bfa' },
    ],
    products: [
      { code: '180/280Pc', form: 'Concentrated Powder / Encapsulate', use: 'Premix Applications' },
      { code: '180P',      form: 'Powder',                            use: 'Mash Feeds' },
      { code: '280P',      form: 'Encapsulated Powder',               use: 'Pelleted Feeds (88°C / 190°F)' },
      { code: '280Lc',     form: 'Liquid Concentrate',                use: 'Post-Pellet Spray Application' },
    ],
    conclusion: null,
    downloadLabel: '↓ DOWNLOAD PRODUCT DATASHEET',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/767b15b6f_AGal-Pro.pdf',
  },
  AZ: {
    subtitle: 'YEMİNİZİN REAL POTENSİALINI AÇIN',
    tagline: (
      <>
        <strong>AGal-Pro™</strong>, quşların yemindəki anti-qidalanma faktorlarını, xüsusilə <strong>α-qalakto-oligosaxaridləri</strong> və <strong>arabinoksilanları</strong> hədəf alaraq, rasiondakı qida maddələrinin daha yaxşı mənimsənilməsini təmin edir. Bu güclü enzim kompleksi daha yüksək məhsuldarlıq üçün yemin iqtisadi dəyərini artırır.
      </>
    ),
    benefitsLabel: 'ƏSAS ÜSTÜNLÜKLƏR',
    productsLabel: 'MƏHSUL SEÇİMLƏRİ',
    tableHeaders: ['Məhsul', 'Forması', 'İstifadə məqsədi'],
    benefits: [
      { icon: Zap,         title: 'Enerji və protein mövcudluğunu artırır', desc: 'Məhsuldarlıqda nəzərəçarpacaq yüksəliş təmin edir.', color: '#fbbf24' },
      { icon: Shield,      title: 'Quş rifahını dəstəkləyir',               desc: 'Daha yaxşı həzm, daha sağlam altlıq və pəncə vəziyyəti.', color: '#38bdf8' },
      { icon: Settings,    title: 'Sistemə tam inteqrasiya olunur',          desc: 'Premiksə əlavə edilə bilər, pelletingdən əvvəl və ya sonra tətbiq oluna bilər.', color: '#a78bfa' },
      { icon: FlaskConical,title: 'Quru və maye formaları mövcuddur',        desc: 'Formulasiya çevikliyini təmin edir. Canlı mikrob ehtiva etmir — sabit, təkrarlana bilən təsir.', color: '#34d399' },
    ],
    products: [
      { code: '180/280Pc', form: 'Konsentrat Toz / Kapsul', use: 'Premiks üçün' },
      { code: '180P',      form: 'Toz',                     use: 'Sadə qarışıq yemlər üçün' },
      { code: '280P',      form: 'Kapsul Toz',              use: 'Pelletlənmiş yemlər üçün (88°C-yə qədər)' },
      { code: '280Lc',     form: 'Maye Konsentrat',         use: 'Pelleting sonrası püskürtmə üçün' },
    ],
    conclusion: 'Enzimlər yalnız əlavə maddə deyil – onlar yemin iqtisadi dəyərini artırmaq üçün əsas açardır. AGal-Pro™ ilə hər qram yemdən daha çox qida maddəsi əldə edin.',
    downloadLabel: '↓ MƏHSUL TƏLİMATINI YÜKLƏYİN',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/2e6f761da_AGalyemqatqisiAZ.pdf',
  },
};
// RU falls back to EN
CONTENT.RU = CONTENT.EN;

export default function AGalProModal({ open, onClose }) {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.EN;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.88)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(6,20,14,0.97) 0%, rgba(4,14,10,0.99) 100%)',
              border: '1px solid rgba(52,211,153,0.35)',
              boxShadow: '0 0 70px rgba(52,211,153,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(52,211,153,0.15)',
                background: 'rgba(52,211,153,0.06)',
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
                  <Leaf className="w-4 h-4" style={{ color: '#34d399', filter: 'drop-shadow(0 0 5px #34d399)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px] flex items-baseline gap-0.5">
                    AGal-Pro<sup className="text-[9px] font-bold" style={{ color: '#34d399' }}>TM</sup>
                    <span className="ml-2 text-white">{lang === 'AZ' ? 'Yem Fermentləri' : 'Feed Enzymes'}</span>
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(52,211,153,0.55)' }}>
                    {c.subtitle}
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

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="font-inter text-sm leading-relaxed"
                style={{ color: 'rgba(52,211,153,0.85)' }}
              >
                {c.tagline}
              </motion.p>

              {/* Key Benefits */}
              <div>
                <p className="font-orbitron text-[10px] tracking-[4px] mb-3" style={{ color: 'rgba(52,211,153,0.6)' }}>{c.benefitsLabel}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {c.benefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <motion.div
                        key={b.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.07 }}
                        className="rounded-xl p-4"
                        style={{
                          background: `linear-gradient(135deg, ${b.color}10, ${b.color}04)`,
                          border: `1px solid ${b.color}28`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: b.color, filter: `drop-shadow(0 0 4px ${b.color})` }} />
                          <span className="font-orbitron text-[10px] font-bold tracking-wide" style={{ color: b.color }}>{b.title}</span>
                        </div>
                        <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{b.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Product Table */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="font-orbitron text-[10px] tracking-[4px] mb-3" style={{ color: 'rgba(52,211,153,0.6)' }}>{c.productsLabel}</p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(52,211,153,0.2)' }}>
                  <div
                    className="grid grid-cols-3 px-4 py-2"
                    style={{ background: 'rgba(52,211,153,0.12)', borderBottom: '1px solid rgba(52,211,153,0.15)' }}
                  >
                    {c.tableHeaders.map(h => (
                      <span key={h} className="font-orbitron text-[9px] font-bold tracking-widest" style={{ color: '#34d399' }}>{h}</span>
                    ))}
                  </div>
                  {c.products.map((row, i) => (
                    <div
                      key={row.code}
                      className="grid grid-cols-3 px-4 py-3"
                      style={{
                        borderBottom: i < c.products.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}
                    >
                      <span className="font-orbitron text-[10px] font-bold text-white">{row.code}</span>
                      <span className="font-inter text-xs" style={{ color: 'rgba(52,211,153,0.75)' }}>{row.form}</span>
                      <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{row.use}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AZ conclusion note */}
              {c.conclusion && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  className="font-inter text-xs leading-relaxed px-1"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {c.conclusion}
                </motion.p>
              )}

              {/* Download link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.48 }}
                className="pt-1"
              >
                <a
                  href={c.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all duration-200 hover:opacity-80"
                  style={{ color: 'rgba(52,211,153,0.6)' }}
                >
                  {c.downloadLabel}
                </a>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}