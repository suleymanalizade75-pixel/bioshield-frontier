import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Star, Truck } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#fbbf24';

const CONTENT = {
  en: {
    subtitle: 'ACETATE & PROPIONATE SALTS FOR ANIMAL FEED',
    tagline: <>Niacet (a Kerry company) <strong>Calprona</strong> feed additives help maintain feed quality, reduce feed waste and support improved animal health and performance.</>,
    benefitsHeader: 'KEY BENEFITS',
    benefits: [
      { icon: Star,  heading: 'Quality', items: ['High purity', 'No insoluble material', 'Low iron content'] },
      { icon: Leaf,  heading: 'Utility', items: ['Superior flowability', 'Low dust (granulates)', 'Safety/handling'] },
      { icon: Truck, heading: 'Supply',  items: ['Economy of scale', 'U.S and EU production', 'Steady supply'] },
    ],
    rangeHeader: 'PRODUCT RANGE',
    colPreservative: 'FEED PRESERVATIVE',
    colEnhancer: 'PERFORMANCE ENHANCER & MINERAL SUPPLEMENT',
    products: [
      { code: 'Calprona CP', name: 'Calcium Propionate',  preservative: true,  enhancer: true  },
      { code: 'Calprona SP', name: 'Sodium Propionate',   preservative: true,  enhancer: true  },
      { code: 'Calprona CA', name: 'Calcium Acetate',     preservative: false, enhancer: true  },
      { code: 'Calprona MA', name: 'Magnesium Acetate',   preservative: false, enhancer: true  },
      { code: 'Calprona ZA', name: 'Zinc Acetate',        preservative: false, enhancer: true  },
      { code: 'Calprona SD', name: 'Sodium Diacetate',    preservative: true,  enhancer: true  },
      { code: 'Calprona SA', name: 'Sodium Acetate',      preservative: true,  enhancer: true  },
    ],
    download: '↓ DOWNLOAD PRODUCT DATASHEET',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/3a4208df0_CalpronaforFeedPreservation.pdf',
  },
  az: {
    subtitle: 'HEYVAN YEMİ ÜÇÜN ASETAT VƏ PROPİONAT DUZLARI',
    tagline: <>Niacet (Kerry şirkəti) <strong>Calprona</strong> yem əlavələri yem keyfiyyətini qoruyur, israfı azaldır və heyvan sağlamlığı ilə performansını dəstəkləyir.</>,
    benefitsHeader: 'ƏSAS ÜSTÜNLÜKLƏR',
    benefits: [
      { icon: Star,  heading: 'Premium Keyfiyyət', items: ['Yüksək saflıq dərəcəsi ilə etibarlı tərkib', 'Həll olmayan hissəciklər yoxdur – məhsul tamamilə homojendir', 'Aşağı dəmir tərkibi – stabil və təhlükəsiz formul'] },
      { icon: Leaf,  heading: 'İstifadə Rahatlığı', items: ['Əla axıcılıq – yemdə asan qarışma', 'Aşağı tozluluq (xüsusilə qranul formalarda) – daha təmiz iş şəraiti', 'Təhlükəsizlik və sadə tətbiq'] },
      { icon: Truck, heading: 'Sabit Təchizat',     items: ['ABŞ və Avropa İttifaqı istehsalı', 'Miqyas iqtisadiyyatı və davamlı tədarük imkanları', 'Mütəxəssis dəstəyi və lokal nümayəndəliklərlə xidmət'] },
    ],
    rangeHeader: 'MƏHSUL ÇEŞİDİ',
    colPreservative: 'YEM QORUYUCUSU',
    colEnhancer: 'PERFORMANS GÜCLƏNDİRİCİSİ / MİNERAL ƏLAVƏ',
    products: [
      { code: 'Calprona CP', name: 'Kalsium Propionat',  preservative: true,  enhancer: true  },
      { code: 'Calprona SP', name: 'Natrium Propionat',  preservative: true,  enhancer: true  },
      { code: 'Calprona CA', name: 'Kalsium Asetat',     preservative: false, enhancer: true  },
      { code: 'Calprona MA', name: 'Maqnezium Asetat',   preservative: false, enhancer: true  },
      { code: 'Calprona ZA', name: 'Sink Asetat',        preservative: false, enhancer: true  },
      { code: 'Calprona SD', name: 'Natrium Diasetat',   preservative: true,  enhancer: true  },
      { code: 'Calprona SA', name: 'Natrium Asetat',     preservative: true,  enhancer: true  },
    ],
    download: '↓ MƏHSUL LİSTİNİ YÜKLƏ',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/33d0c29f2_CalpronayemqoruyucuAZ.pdf',
  },
};

export default function CalpronaModal({ open, onClose }) {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;

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
              background: 'linear-gradient(145deg, rgba(8,14,24,0.97) 0%, rgba(5,10,18,0.99) 100%)',
              border: `1px solid ${COLOR}55`,
              boxShadow: `0 0 70px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
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
                  style={{ background: `${COLOR}28`, border: `1.5px solid ${COLOR}66`, boxShadow: `0 0 14px ${COLOR}55` }}
                >
                  <Leaf className="w-4 h-4" style={{ color: COLOR, filter: `drop-shadow(0 0 5px ${COLOR})` }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px] flex items-baseline gap-0.5">
                    Calprona<sup className="text-[9px] font-bold" style={{ color: COLOR }}>®</sup>
                    <span className="ml-1.5 text-white">Feed Additives</span>
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>
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
                style={{ color: `${COLOR}cc` }}
              >
                {c.tagline}
              </motion.p>

              {/* Key Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="font-orbitron text-[10px] font-bold tracking-wide mb-3" style={{ color: COLOR }}>{c.benefitsHeader}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {c.benefits.map(({ icon: Icon, heading, items }) => (
                    <div
                      key={heading}
                      className="rounded-xl p-4"
                      style={{ background: `${COLOR}0d`, border: `1px solid ${COLOR}28` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-3.5 h-3.5" style={{ color: COLOR }} />
                        <span className="font-orbitron text-[10px] font-bold" style={{ color: COLOR }}>{heading.toUpperCase()}</span>
                      </div>
                      <ul className="space-y-1">
                        {items.map((item, i) => (
                          <li key={i} className="font-inter text-[11px] flex items-start gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            <span style={{ color: COLOR }} className="flex-shrink-0 mt-0.5">•</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Product Matrix */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <p className="font-orbitron text-[10px] tracking-[4px] mb-3" style={{ color: `${COLOR}88` }}>{c.rangeHeader}</p>
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: `${COLOR}18`, borderBottom: `1px solid ${COLOR}28` }}>
                        <th className="px-4 py-2.5 text-left font-orbitron text-[9px] tracking-widest" style={{ color: COLOR }}></th>
                        <th className="px-4 py-2.5 text-left font-orbitron text-[9px] tracking-widest" style={{ color: COLOR }}></th>
                        <th className="px-4 py-2.5 text-center font-orbitron text-[9px] tracking-wide" style={{ color: COLOR }}>{c.colPreservative}</th>
                        <th className="px-4 py-2.5 text-center font-orbitron text-[9px] tracking-wide" style={{ color: COLOR }}>{c.colEnhancer}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.products.map(({ code, name, preservative, enhancer }, i) => (
                        <tr key={code} style={{ borderBottom: i < c.products.length - 1 ? `1px solid ${COLOR}10` : 'none', background: i % 2 === 0 ? `${COLOR}06` : 'transparent' }}>
                          <td className="px-4 py-2.5 font-orbitron text-[10px] font-bold whitespace-nowrap" style={{ color: COLOR }}>{code}</td>
                          <td className="px-4 py-2.5 font-inter" style={{ color: 'rgba(255,255,255,0.55)' }}>{name}</td>
                          <td className="px-4 py-2.5 text-center text-base">{preservative ? '✔' : ''}</td>
                          <td className="px-4 py-2.5 text-center text-base">{enhancer ? '✔' : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Download */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
              >
                <a
                  href={c.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all duration-200 hover:opacity-80"
                  style={{ color: `${COLOR}99` }}
                >
                  {c.download}
                </a>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}