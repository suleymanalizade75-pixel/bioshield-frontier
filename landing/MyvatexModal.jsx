import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Zap, Leaf, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const CONTENT = {
  en: {
    subtitle: 'PRODUCE HIGHER QUALITY FEED MORE EFFICIENTLY',
    tagline: 'Myvatex™ AF-11 emulsifier is a unique, vegetable oil-based specialty ingredient made specifically for animal feed. This novel technology interacts with the protein, starch, lipid and moisture components of pet food formulas to optimize homogeneity in the mix, leading to a reduction in resistance during extrusion.',
    costTitle: 'REDUCE PRODUCTION COSTS',
    costBenefits: [
      'Improve throughput by up to 57% (ton/hr)*',
      'Reduce power consumption by up to 36%*',
      'Increase inclusion of water',
      'Increase use of low-cost ingredients',
      'Extend use of dies',
    ],
    capacityTitle: 'INCREASE CAPACITY',
    qualityBenefits: [
      'Improve product quality',
      'Fewer fines',
      'Less burning',
      'Extend shelf-life',
      'Increase PDI',
    ],
    sustainTitle: 'SUSTAINABLY SOURCED',
    sustainText: 'Kerry is a full member of the Roundtable on Sustainable Palm Oil and works closely with partners to provide transparency and traceability.',
    specsTitle: 'PRODUCT SPECIFICATIONS',
    tableHeaders: ['Product Name', 'Product No.', 'Package', 'Energy', 'Dosage Rate'],
    productLabel: 'Powder · Palm',
    packageVal: '25 kg (55.1 lb) carton\n40 per pallet',
    energyVal: '8,000 Kcal/kg\n(3,620 Kcal/lb)',
    dosageVal: '0.07–0.09%\n(1.4–1.8 lbs/ton)',
    footNote: '* Based on 11 field trials; details available upon request.',
    download: '↓ DOWNLOAD PRODUCT DATASHEET',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/7d475dea6_Animal_MyvatexAF11SellSheet.pdf',
  },
  az: {
    subtitle: 'DAHA KEYFİYYƏTLİ YEMİ DAHA EFFEKTİV HAZIRLA',
    tagline: 'Bitki mənşəli xammaldan hazırlanmış bu unikal yem qatqısı, yem formulundakı protein, nişasta, yağ və nəm komponentləri ilə qarşılıqlı əlaqədə olaraq qarışığın homogenliyini optimallaşdırır. Bu isə ekstrudiya prosesində müqavimətin azalmasına gətirib çıxarır.',
    costTitle: 'İSTEHSAL XƏRCLƏRİNİ AZALDIR',
    costBenefits: [
      'Saatda məhsuldarlığı 57%-ə qədər artırır*',
      'Enerji sərfiyyatını 36%-ə qədər azaldır*',
      'Daha çox su qatılmasına şərait yaradır',
      'Aşağı dəyərli komponentlərin istifadəsini artırır',
      'Pres formalı qəliblərin ömrünü uzadır',
    ],
    capacityTitle: 'İSTEHSAL GÜCÜNÜ ARTIR VƏ KEYFİYYƏTİ YÜKSƏLT',
    qualityBenefits: [
      'Daha az incə toz hissəciklər (fines)',
      'Yemdə yanmanın qarşısını alır',
      'Saxlama müddətini artırır',
      'Fiziki davamlılığı (PDI) yüksəldir',
    ],
    sustainTitle: 'DAYANIQLI MƏNBƏ',
    sustainText: 'Kerry şirkəti Davamlı Palma Yağı üzrə Beynəlxalq Dəyirmi Masanın tam hüquqlu üzvüdür və bütün tədarük zəncirində şəffaflıq və izlənəbilərlik üzərində çalışır.',
    specsTitle: 'MƏHSUL XÜSUSİYYƏTLƏRİ',
    tableHeaders: ['Məhsul', 'Enerji Dəyəri', 'Qablaşdırma', 'Dozaj'],
    productLabel: 'Toz · Palma',
    packageVal: '25 kq karton\n(paletdə 40 ədəd)',
    energyVal: '8,000 Kkal/kq',
    dosageVal: '0.07–0.09%\n(1.4–1.8 lb/ton)',
    footNote: '* 11 sahəvi sınağa əsaslanır – ətraflı məlumat təqdim oluna bilər.',
    download: '↓ MƏLUMAT VƏRƏQİNİ YÜKLƏ',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/501f87410_MyvatexAF-11AZ.pdf',
  },
};

export default function MyvatexModal({ open, onClose }) {
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
              background: 'linear-gradient(145deg, rgba(10,16,6,0.97) 0%, rgba(6,12,4,0.99) 100%)',
              border: '1px solid rgba(251,191,36,0.35)',
              boxShadow: '0 0 70px rgba(251,191,36,0.10), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(251,191,36,0.15)', background: 'rgba(251,191,36,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(251,191,36,0.18)', border: '1.5px solid rgba(251,191,36,0.45)', boxShadow: '0 0 14px rgba(251,191,36,0.35)' }}
                >
                  <Package className="w-4 h-4" style={{ color: '#fbbf24', filter: 'drop-shadow(0 0 5px #fbbf24)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px] flex items-baseline gap-0.5">
                    Myvatex<sup className="text-[9px] font-bold" style={{ color: '#fbbf24' }}>TM</sup>
                    <span className="ml-1.5 text-white">AF-11 Emulsifier</span>
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(251,191,36,0.55)' }}>
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
                style={{ color: 'rgba(251,191,36,0.85)' }}
              >
                {c.tagline}
              </motion.p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Reduce Costs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.22)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#fbbf24', filter: 'drop-shadow(0 0 4px #fbbf24)' }} />
                    <span className="font-orbitron text-[10px] font-bold tracking-wide" style={{ color: '#fbbf24' }}>{c.costTitle}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {c.costBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 font-inter text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <span style={{ color: '#fbbf24' }} className="mt-0.5 flex-shrink-0">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Increase Capacity */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.17 }}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.22)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 flex-shrink-0" style={{ color: '#fbbf24', filter: 'drop-shadow(0 0 4px #fbbf24)' }} />
                    <span className="font-orbitron text-[10px] font-bold tracking-wide" style={{ color: '#fbbf24' }}>{c.capacityTitle}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {c.qualityBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 font-inter text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <span style={{ color: '#fbbf24' }} className="mt-0.5 flex-shrink-0">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Sustainably Sourced */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)' }}
              >
                <Leaf className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#34d399' }} />
                <div>
                  <p className="font-orbitron text-[10px] font-bold tracking-wide mb-1" style={{ color: '#34d399' }}>{c.sustainTitle}</p>
                  <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {c.sustainText}
                  </p>
                </div>
              </motion.div>

              {/* Product Specs Table */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                <p className="font-orbitron text-[10px] tracking-[4px] mb-3" style={{ color: 'rgba(251,191,36,0.6)' }}>{c.specsTitle}</p>
                <div className="rounded-xl overflow-x-auto" style={{ border: '1px solid rgba(251,191,36,0.2)' }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: 'rgba(251,191,36,0.12)', borderBottom: '1px solid rgba(251,191,36,0.15)' }}>
                        {c.tableHeaders.map(h => (
                          <th key={h} className="px-3 py-2 text-left font-orbitron text-[9px] font-bold tracking-widest whitespace-nowrap" style={{ color: '#fbbf24' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <td className="px-3 py-3 font-orbitron text-[10px] font-bold text-white whitespace-nowrap">Myvatex AF-11<br/><span className="font-inter font-normal text-[10px]" style={{ color: 'rgba(251,191,36,0.6)' }}>{c.productLabel}</span></td>
                        {lang !== 'az' && <td className="px-3 py-3 font-inter" style={{ color: 'rgba(255,255,255,0.5)' }}>5Z11022-01 /<br/>20143191</td>}
                        <td className="px-3 py-3 font-inter whitespace-nowrap" style={{ color: 'rgba(251,191,36,0.75)' }}>{c.energyVal.split('\n').map((l,i) => <span key={i}>{l}{i===0 && c.energyVal.includes('\n') && <br/>}</span>)}</td>
                        <td className="px-3 py-3 font-inter" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.packageVal.split('\n').map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}</td>
                        <td className="px-3 py-3 font-inter whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.dosageVal.split('\n').map((l,i) => <span key={i}>{l}{i===0 && c.dosageVal.includes('\n') && <br/>}</span>)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {c.footNote}
                </p>
              </motion.div>

              {/* Download */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38 }}
                className="pt-1"
              >
                <a
                  href={c.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all duration-200 hover:opacity-80"
                  style={{ color: 'rgba(251,191,36,0.6)' }}
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