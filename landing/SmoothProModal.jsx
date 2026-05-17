import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Smooth Pro', 'Liquid', 'Carcass Quality'] : lang === 'AZ' ? ['Smooth Pro', 'Maye', 'Karkas Keyfiyyəti'] : ['Smooth Pro', 'Жидкая', 'Качество Туши'],
  features: lang === 'EN'
    ? 'In broilers, excessive movements during the last few days of rearing or struggles during transport and harvest may cause scratches and bruising. This is economically significant as it causes increased mortality and higher carcass rejection at the slaughterhouse. In cattle and pigs, the reduction of excessive movement has a positive effect on body energy savings and therefore on the costs of feeding.'
    : lang === 'AZ'
    ? 'Bройler toyuqlarda, yetişdirmənin son günlərindəki həddindən artıq hərəkətlər və ya nəqliyyat və yığım zamanı mübarizə cızıqlara və göyərmiş yerlərin əmələ gəlməsinə səbəb ola bilər. Bu, artmış ölümlülüyə və kəsimxanada karkas rəddiyəsinin artmasına səbəb olduğundan iqtisadi cəhətdən əhəmiyyətlidir. Qaramal və donuzlarda həddindən artıq hərəkətin azaldılması bədən enerjisinin qənaətinə, buna görə də yem xərclərinin azalmasına müsbət təsir göstərir.'
    : 'У бройлеров чрезмерные движения в последние дни выращивания или борьба во время транспортировки и забоя могут вызвать царапины и синяки. Это экономически значимо, так как приводит к повышенной смертности и большему браку туш на скотобойне. У крупного рогатого скота и свиней снижение чрезмерной подвижности оказывает положительное влияние на экономию энергии организма и, следовательно, на затраты на кормление.',
  benefits: lang === 'EN' ? [
    'Helps to calm animals down, avoiding excessive movements and energy waste',
    'The calming effect helps to avoid bruising and scratches during harvest or transport',
    'Better skin integrity and fewer rejections at the slaughterhouse due to skin lesions',
  ] : lang === 'AZ' ? [
    'Heyvanları sakitləşdirərək həddindən artıq hərəkəti və enerji itkisini önləyir',
    'Sakinləşdirici təsir yığım və ya nəqliyyat zamanı göyərmiş yerlərin və cızıqların qarşısını alır',
    'Daha yaxşı dəri bütövlüyü və dəri lezyonlarına görə kəsimxanada daha az rədd',
  ] : [
    'Успокаивает животных, предотвращая чрезмерные движения и потерю энергии',
    'Успокаивающий эффект помогает избежать синяков и царапин при убое или транспортировке',
    'Лучшая целостность кожного покрова и меньше отбраковки на скотобойне из-за поражений кожи',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml, 500 ml and 1 l bottle, 5 l and 25 l canister' : lang === 'AZ' ? '250 ml, 500 ml və 1 l şişə, 5 l və 25 l kanister' : '250 мл, 500 мл и 1 л бутылка, 5 л и 25 л канистра',
});

export default function SmoothProModal({ open, onClose }) {
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
              border: '1px solid rgba(52,211,153,0.3)',
              boxShadow: '0 0 60px rgba(52,211,153,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(52,211,153,0.18)',
                background: 'rgba(52,211,153,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Smooth Pro
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(52,211,153,0.55)' }}>
                  XVET · LIQUID SUPPLEMENT
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
                      background: 'rgba(52,211,153,0.12)',
                      border: '1px solid rgba(52,211,153,0.35)',
                      color: '#34d399',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#34d399' }}>
                Naturally Calming
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(52,211,153,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/3861160fd_image.png"
                    alt="Smooth Pro product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(52,211,153,0.6)' }}>
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
                  background: 'rgba(52,211,153,0.06)',
                  border: '1px solid rgba(52,211,153,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(52,211,153,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="space-y-3">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#34d399' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(52,211,153,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(52,211,153,0.6)' }}>{data.packagingLabel}</div>
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
