import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Vitaquamix', 'Powder', 'Vitamin/Mineral/Amino Acids'] : lang === 'AZ' ? ['Vitaquamix', 'Toz', 'Vitamin/Mineral/Amino Turşular'] : ['Vitaquamix', 'Порошок', 'Витамин/Минерал/Аминокислоты'],
  tagline: lang === 'EN' ? 'From hatch to harvest' : lang === 'AZ' ? 'Çıxışdan hasılata qədər' : 'От вылупления до сбора урожая',
  features: lang === 'EN'
    ? 'Vitaquamix supplies essential vitamins, minerals, and amino acids to improve the growth rate and performance of aqua species. Helps to increase resistance against diseases and stress. Highly bioavailable vitamins and amino acids ensure maximum efficacy. Additionally, Fructooligosaccharides (FOS) and yeast extract (MOS) boost the immune system to support against stress conditions.'
    : lang === 'AZ'
    ? 'Vitaquamix su növlərinin böyümə sürətini və məhsuldarlığını artırmaq üçün vacib vitaminlər, minerallar və aminturşular təmin edir. Xəstəliklərə və stresə qarşı müqavimətin artırılmasına kömək edir. Yüksək bioloji mənimsənilə bilən vitaminlər və aminturşular maksimum effektivliyi təmin edir. Əlavə olaraq, frukto-oliqosakaridlər (FOS) və maya ekstraktı (MOS) stres şəraitinə qarşı dəstək üçün immun sistemini gücləndirir.'
    : 'Vitaquamix обеспечивает водные виды необходимыми витаминами, минералами и аминокислотами для улучшения темпов роста и продуктивности. Помогает повысить устойчивость к болезням и стрессу. Высокобиодоступные витамины и аминокислоты обеспечивают максимальную эффективность. Кроме того, фруктоолигосахариды (ФОС) и экстракт дрожжей (МОС) укрепляют иммунную систему для противодействия стрессовым условиям.',
  benefits: lang === 'EN' ? [
    'Uniform growth',
    'Resistance to stress',
    'Increased livability',
    'Cost-efficient rearing',
  ] : lang === 'AZ' ? [
    'Bərabər böyümə',
    'Stresə davamlılıq',
    'Artan yaşama qabiliyyəti',
    'Xərcsəmərəli yetişdirmə',
  ] : [
    'Равномерный рост',
    'Устойчивость к стрессу',
    'Повышенная выживаемость',
    'Экономически эффективное выращивание',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '10 kg and 25 kg craft bags' : lang === 'AZ' ? '10 kq və 25 kq kraft torbaları' : '10 кг и 25 кг крафт-мешки',
});

export default function VitaquamixModal({ open, onClose }) {
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
              border: '1px solid rgba(34,197,94,0.3)',
              boxShadow: '0 0 60px rgba(34,197,94,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(34,197,94,0.18)',
                background: 'rgba(34,197,94,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Vitaquamix
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(34,197,94,0.55)' }}>
                  XVET · POWDER SUPPLEMENT
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
                      background: 'rgba(34,197,94,0.12)',
                      border: '1px solid rgba(34,197,94,0.35)',
                      color: '#22c55e',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#22c55e' }}>
                {data.tagline}
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(34,197,94,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/765c83ee1_image.png"
                    alt="Vitaquamix product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(34,197,94,0.6)' }}>
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
                  background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(34,197,94,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="space-y-3">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(34,197,94,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(34,197,94,0.6)' }}>{data.packagingLabel}</div>
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
