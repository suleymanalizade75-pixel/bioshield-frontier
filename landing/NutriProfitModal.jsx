import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, FlaskConical, Leaf } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#f97316';

const CONTENT = {
  en: {
    subtitle: 'PROTEASE ENZYME · POULTRY & SWINE',
    tagline: 'Targets plant and animal protein sources to improve nutrient digestibility and reduce feed costs.',
    descBullets: [
      'A robust protease produced by a non-GM bacterial strain, capable of hydrolyzing the interior peptide bonds of different proteins.',
      'Improves protein digestibility and reduces feed costs for poultry & swine.',
      'Targets substrates in typical feedstuffs such as sorghum, rapeseed meal, meat & bone-meal, soybean meal, DDGS and other alternative protein sources.',
    ],
    benefitsHeader: 'KEY BENEFITS',
    benefits: [
      'Improves protein and amino acid digestibility',
      'Facilitates flexible feed formulations and helps to overcome production losses due to raw material changes',
      'Reduces diet costs by diminishing the inclusion of protein ingredients and/or synthetic amino acids',
      'Reduces nitrogen excretion, improving the quality of the litter and air',
    ],
    specsHeader: 'RECOMMENDED USE',
    specs: [
      { label: 'Dose Rate',       value: '13–16 g/MT of feed' },
      { label: 'Thermostability', value: 'Retains >90% of activity (88°C, 120 seconds)' },
      { label: 'Activity',        value: '12,000 U/g' },
    ],
    sustainNote: <>Produced by a <strong style={{ color: 'rgba(255,255,255,0.75)' }}>non-GM bacterial strain</strong>. Contact a regional Kerry representative to see regional performance data — <span style={{ color: '#34d399' }}>Kerry.com/applications/animal-nutrition</span></>,
    download: '↓ DOWNLOAD PRODUCT BROCHURE',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/d7a4229fd_NutriProfitConc-Brochure.pdf',
  },
  az: {
    subtitle: 'PROTEASE ENZİMİ · TOYUQ & DONUZ',
    tagline: 'Zülallar daha yaxşı mənimsənsin, xərclər daha aşağı düşsün.',
    descBullets: [
      'Nutri-Profit™, genetik modifikasiya olunmamış bakterial mənşəli güclü proteazdır.',
      'Zülal zəncirindəki daxili peptid rabitələrini parçalayaraq qida maddələrinin mənimsənilməsini əldəqayırma dərəcədə yaxşılaşdırır.',
      'Toyuq və donuzlar üçün optimallaşdırılmış həll. Sorqo, kolza küspəsi, ət-sümük unu, soya küspəsi, DDGS və digər alternativ zülal mənbələrindəki substratlara hədəfli təsir göstərir.',
    ],
    benefitsHeader: 'ƏSAS ÜSTÜNLÜKLƏR',
    benefits: [
      'Zülal və amin turşularının həzm olunmasını artırır',
      'Xammal dəyişikliyi zamanı istehsal itkilərini minimuma endirməyə kömək edir',
      'Rasionda zülal komponentlərinin və/və ya sintetik amin turşularının miqdarını azaldaraq yem xərclərini azaldır',
      'Azot ifrazını azaldır – altlığın və havanın keyfiyyətini yaxşılaşdırır',
    ],
    specsHeader: 'MƏHSUL GÖSTƏRİCİLƏRİ',
    specs: [
      { label: 'Tövsiyə olunan doza', value: '13–16 q / ton yem' },
      { label: 'Termal sabitlik',     value: '88°C-də 120 saniyə ərzində >90% aktivlik saxlayır' },
      { label: 'Aktivlik',            value: '12,000 U/g' },
      { label: 'Forması',             value: 'Konsentrat toz' },
    ],
    sustainNote: <>Genetik modifikasiya olunmamış <strong style={{ color: 'rgba(255,255,255,0.75)' }}>bakterial mənşəli</strong> güclü protease. Ətraflı regional performans məlumatı üçün Kerry nümayəndənizlə əlaqə saxlayın.</>,
    download: '↓ MƏHSUL BROŞÜRİNİ YÜKLƏ',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/872590a80_Nutri-ProfitConcAZ.pdf',
  },
};

export default function NutriProfitModal({ open, onClose }) {
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
              background: 'linear-gradient(145deg, rgba(10,6,2,0.97) 0%, rgba(8,4,2,0.99) 100%)',
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
                    Nutri-Profit<sup className="text-[9px] font-bold" style={{ color: COLOR }}>TM</sup>
                    <span className="ml-1.5 text-white">Conc</span>
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

              {/* Description bullets */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl p-4 space-y-2"
                style={{ background: `${COLOR}0d`, border: `1px solid ${COLOR}28` }}
              >
                {c.descBullets.map((text, i) => (
                  <div key={i} className="flex items-start gap-2 font-inter text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    <span style={{ color: COLOR }} className="flex-shrink-0 mt-0.5">•</span>
                    <span>{text}</span>
                  </div>
                ))}
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

              {/* Specs Table */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <p className="font-orbitron text-[10px] tracking-[4px] mb-3" style={{ color: `${COLOR}88` }}>{c.specsHeader}</p>
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: `${COLOR}18`, borderBottom: `1px solid ${COLOR}28` }}>
                        <th className="px-4 py-2.5 text-left font-orbitron text-[9px] tracking-widest" style={{ color: COLOR }}>GÖSTƏRİCİ</th>
                        <th className="px-4 py-2.5 text-left font-orbitron text-[9px] tracking-widest" style={{ color: COLOR }}>DƏYƏR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.specs.map(({ label, value }, i) => (
                        <tr key={label} style={{ borderBottom: i < c.specs.length - 1 ? `1px solid ${COLOR}10` : 'none', background: i % 2 === 0 ? `${COLOR}06` : 'transparent' }}>
                          <td className="px-4 py-2.5 font-orbitron text-[10px] font-bold whitespace-nowrap" style={{ color: COLOR }}>{label}</td>
                          <td className="px-4 py-2.5 font-inter" style={{ color: 'rgba(255,255,255,0.6)' }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Sustainability note */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)' }}
              >
                <Leaf className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#34d399' }} />
                <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {c.sustainNote}
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