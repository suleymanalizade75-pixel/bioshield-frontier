import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['X-Cid Plus', 'Liquid', 'Acidifiers'] : lang === 'AZ' ? ['X-Cid Plus', 'Maye', 'Turşulaşdırıcılar'] : ['X-Cid Plus', 'Жидкая', 'Подкислители'],
  tagline: lang === 'EN'
    ? 'More than pH'
    : lang === 'AZ'
    ? 'pH-dan çox'
    : 'Больше чем pH',
  features: lang === 'EN'
    ? 'X-Cid Plus is a cutting-edge solution designed to enhance water hygiene by offering robust protection against bacterial contamination. One of its key functionalities is the effective reduction of water pH, creating a hostile environment to harmful bacteria. When X-Cid Plus is used in conjunction with chlorine, it synergistically boosts the concentration of free chlorine in the water. This enhancement significantly improves the efficacy of disinfection processes, ensuring that the water remains cleaner and safer for use.'
    : lang === 'AZ'
    ? 'X-Cid Plus, bakterial çirklənməyə qarşı güclü qorunma təmin edərək su gigiyenasını yaxşılaşdırmaq üçün nəzərdə tutulmuş qabaqcıl bir həlldir. Onun əsas funksiyalarından biri, zərərli bakteriyalar üçün düşmən mühit yaradan suyun pH-nı effektiv şəkildə azaltmaqdır. X-Cid Plus xlor ilə birlikdə istifadə edildikdə, sudakı sərbəst xlor konsentrasiyasını sinergik olaraq artırır. Bu güclənmə dezinfeksiya proseslərinin effektivliyini əhəmiyyətli dərəcədə artırır, suyun daha təmiz və istifadə üçün daha təhlükəsiz qalmasını təmin edir.'
    : 'X-Cid Plus — это передовое решение, разработанное для улучшения гигиены воды путём обеспечения надёжной защиты от бактериального загрязнения. Одной из ключевых функций является эффективное снижение pH воды, создающее враждебную среду для вредоносных бактерий. При использовании X-Cid Plus совместно с хлором синергетически повышается концентрация свободного хлора в воде. Это существенно улучшает эффективность дезинфекционных процессов, обеспечивая более чистую и безопасную воду.',
  benefits: lang === 'EN' ? [
    'Protects against bacterial contamination',
    'Reduces water pH',
    'Enhances free chlorine concentration when used with chlorine',
  ] : lang === 'AZ' ? [
    'Bakterial çirklənmədən qoruyur',
    'Suyun pH-nı azaldır',
    'Xlorla birlikdə istifadə edildikdə sərbəst xlor konsentrasiyasını artırır',
  ] : [
    'Защищает от бактериального загрязнения',
    'Снижает pH воды',
    'Повышает концентрацию свободного хлора при совместном применении с хлором',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '1 l bottle, 5 l and 25 l canisters' : lang === 'AZ' ? '1 l şişə, 5 l və 25 l kanisterlər' : '1 л бутылка, 5 л и 25 л канистры',
});

export default function CalDPhosModal({ open, onClose }) {
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
              border: '1px solid rgba(248,113,113,0.3)',
              boxShadow: '0 0 60px rgba(248,113,113,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(248,113,113,0.18)',
                background: 'rgba(248,113,113,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  X-Cid Plus
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(248,113,113,0.55)' }}>
                  XVET · WATER HYGIENE
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
                      background: 'rgba(248,113,113,0.12)',
                      border: '1px solid rgba(248,113,113,0.35)',
                      color: '#f87171',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#f87171' }}>
                {data.tagline}
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(248,113,113,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/9d7c52b88_image.png"
                    alt="X-Cid Plus product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(248,113,113,0.6)' }}>
                    {data.featureLabel}
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {data.features}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(248,113,113,0.06)',
                  border: '1px solid rgba(248,113,113,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(248,113,113,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="space-y-3">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#f87171' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(248,113,113,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(248,113,113,0.6)' }}>{data.packagingLabel}</div>
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
