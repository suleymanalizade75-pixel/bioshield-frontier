import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Leaf, FlaskConical } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#e879f9';

const CONTENT = {
  en: {
    subtitle: 'MULTI-CARBOHYDRASE ENZYME · POULTRY & SWINE',
    tagline: 'Target cellulose and hemicellulose with one cost effective solution.',
    description: <><strong style={{ color: `${COLOR}cc` }}>NutriXtend™ Optim</strong> delivers the performance expected from a multi-carbohydrase enzyme without the associated increase in cost. It is a combination of <strong style={{ color: 'rgba(255,255,255,0.8)' }}>endo β-(+xylo)-glucanase</strong> and <strong style={{ color: 'rgba(255,255,255,0.8)' }}>β-mannanase</strong> from <em>Aspergillus niger</em> fermentation — proven to unlock more nutrients from existing feedstuffs than mono-component enzyme systems.</>,
    benefitsHeader: 'KEY BENEFITS',
    benefits: [
      'Helps capture the full nutrient value of the diet',
      'Enhances nutritional value of cellulosic and hemicellulosic components (e.g. xyloglucans) from major feed ingredients, whether cereal or legume',
      'Delivers consistent performance even with dietary feedstuff changes',
      'Provides improved substrate coverage compared to single xylanases',
    ],
    formsHeader: 'AVAILABLE FORMS',
    formCol: 'FORM',
    useCol: 'RECOMMENDED USE',
    forms: [
      { form: 'Concentrated Powder', use: 'Premix Application (Encapsulated)' },
      { form: 'Encapsulated Powder', use: 'Pelleted Feeds (<88°C / 190°F)' },
      { form: 'Liquid',              use: 'Post-Pellet Spray Application' },
    ],
    note: <>Contact a regional Kerry representative to see regional performance data — <span style={{ color: '#34d399' }}>Kerry.com/applications/animal-nutrition</span></>,
    download: '↓ DOWNLOAD PRODUCT BROCHURE',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/1f3ba337d_NutriXtendOptim.pdf',
  },
  az: {
    subtitle: 'ÇOX KOMPONENTLİ KARBOHİDRAZ ENZİMİ · QUŞÇULUQ VƏ DONUZÇULUQ',
    tagline: 'Selüloz və hemiselülozu bir əlverişli həll yolu ilə hədəfləyin.',
    description: <><strong style={{ color: `${COLOR}cc` }}>NutriXtend™ Optim</strong>, çox komponentli karbohidraz enzimindən gözlənilən performansı əlavə xərc artımı olmadan təmin edir. <em>Aspergillus niger</em> fermentasiyasından əldə edilən <strong style={{ color: 'rgba(255,255,255,0.8)' }}>endo β-(+xylo)-glükanaza</strong> və <strong style={{ color: 'rgba(255,255,255,0.8)' }}>β-mannanaza</strong> kombinasiyasıdır — tək komponentli ferment sistemlərinə nisbətən mövcud yem xammalından daha çox qida maddəsini azad etdiyi sübut edilmişdir.</>,
    benefitsHeader: 'ƏSAS ÜSTÜNLÜKLƏR',
    benefits: [
      'Yemin tam qida dəyərini əldə etməyə kömək edir',
      'Taxıl və ya paxlalılardan ibarət əsas yem komponentlərinin selülozik və hemiselülozik hissələrinin (məs. ksiloglükanlar) qida dəyərini artırır',
      'Yem tərkibindəki dəyişikliklərə baxmayaraq ardıcıl performans göstərir',
      'Tək ksilanazdlara müqayisədə daha geniş substrat əhatəsi təmin edir',
    ],
    formsHeader: 'MÖVCUD FORMALAR',
    formCol: 'FORMA',
    useCol: 'TÖVSİYƏ OLUNAN İSTİFADƏ',
    forms: [
      { form: 'Konsentrat Toz',    use: 'Premiks Tətbiqi (Kapsullanmış)' },
      { form: 'Kapsullanmış Toz', use: 'Qranullaşdırılmış Yemlər (<88°C / 190°F)' },
      { form: 'Maye',              use: 'Qranullaşdırmadan Sonra Sprey Tətbiqi' },
    ],
    note: <>Regional performans məlumatlarını görmək üçün yerli Kerry nümayəndəsi ilə əlaqə saxlayın — <span style={{ color: '#34d399' }}>Kerry.com/applications/animal-nutrition</span></>,
    download: '↓ MƏHSUL BROŞURUNU YÜKLƏ',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/1f3ba337d_NutriXtendOptim.pdf',
  },
};

export default function NutriXtendModal({ open, onClose }) {
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
              background: 'linear-gradient(145deg, rgba(10,4,12,0.97) 0%, rgba(7,2,10,0.99) 100%)',
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
                  <FlaskConical className="w-4 h-4" style={{ color: COLOR, filter: `drop-shadow(0 0 5px ${COLOR})` }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px] flex items-baseline gap-0.5">
                    NutriXtend<sup className="text-[9px] font-bold" style={{ color: COLOR }}>TM</sup>
                    <span className="ml-1.5 text-white">Optim</span>
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
                className="font-inter text-sm leading-relaxed font-semibold"
                style={{ color: `${COLOR}cc` }}
              >
                {c.tagline}
              </motion.p>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl p-4"
                style={{ background: `${COLOR}0d`, border: `1px solid ${COLOR}28` }}
              >
                <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {c.description}
                </p>
              </motion.div>

              {/* Key Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="font-orbitron text-[10px] font-bold tracking-wide mb-3" style={{ color: COLOR }}>{c.benefitsHeader}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {c.benefits.map((b, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-3 flex items-start gap-2"
                      style={{ background: `${COLOR}0a`, border: `1px solid ${COLOR}22` }}
                    >
                      <Zap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: COLOR }} />
                      <span className="font-inter text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Forms Table */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <p className="font-orbitron text-[10px] tracking-[4px] mb-3" style={{ color: `${COLOR}88` }}>{c.formsHeader}</p>
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: `${COLOR}18`, borderBottom: `1px solid ${COLOR}28` }}>
                        <th className="px-4 py-2.5 text-left font-orbitron text-[9px] tracking-widest" style={{ color: COLOR }}>{c.formCol}</th>
                        <th className="px-4 py-2.5 text-left font-orbitron text-[9px] tracking-widest" style={{ color: COLOR }}>{c.useCol}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.forms.map(({ form, use }, i) => (
                        <tr key={form} style={{ borderBottom: i < c.forms.length - 1 ? `1px solid ${COLOR}10` : 'none', background: i % 2 === 0 ? `${COLOR}06` : 'transparent' }}>
                          <td className="px-4 py-2.5 font-orbitron text-[10px] font-bold whitespace-nowrap" style={{ color: COLOR }}>{form}</td>
                          <td className="px-4 py-2.5 font-inter" style={{ color: 'rgba(255,255,255,0.6)' }}>{use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Note */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)' }}
              >
                <Leaf className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#34d399' }} />
                <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {c.note}
                </p>
              </motion.div>

              {/* Download */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
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