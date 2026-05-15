import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Heart, Zap } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const CONTENT = {
  en: {
    subtitle: 'STRESS HAPPENS; CONTROL YOUR RESPONSE',
    tagline: (
      <>Kerry <strong>Everwell PT100</strong> is a swift and stable postbiotic solution that can help support gut health and animal performance during times of stress. Unlike traditional gut health solutions, Everwell PT100 does not rely on living cells, helping you take the guesswork out of managing stress.</>
    ),
    benefitsHeader: 'KEY BENEFITS',
    benefits: [
      'Part of an antibiotic-free nutrition strategy.',
      'Delivers bioactive molecules directly for a highly targeted animal response.',
      'Product efficacy does not depend on microorganism survivability.',
      'Thermally-stable to reduce storage and feed processing challenges.',
    ],
    studiesHeader: 'STUDIES SHOW EVERWELL PT100 CAN HELP:',
    outcomes: [
      { icon: Shield, text: 'Challenged birds maintain health so they can power through stress' },
      { icon: Heart,  text: 'Maintain healthy gut function' },
      { icon: Zap,    text: 'Manage performance losses from challenged birds' },
    ],
    specsHeader: 'PRODUCT DETAILS',
    specs: [
      { label: 'Product Number',   value: '20657868' },
      { label: 'Typical Use Rate', value: '0.2 lb/ton' },
      { label: 'Packaging',        value: '50 lb bag' },
      { label: 'MOQ',              value: '2,000 lbs' },
      { label: 'Shelf Life',       value: '12 months' },
    ],
    studyNote: "Ask to see our studies on the effect of Everwell PT100 on body weight and feed conversion ratio. Because of factors outside of Kerry's control, individual results cannot be predicted or guaranteed.",
    download: '↓ DOWNLOAD PRODUCT DATASHEET',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/4d5543580_APS_EverwellPT100_Broiler_SS_Global_PR.pdf',
  },
  az: {
    subtitle: 'STRES QAÇILMAZDİR, CAVABINIZ NƏ OLACAQ?',
    tagline: (
      <>Kerry <strong>Everwell PT100</strong>, stres dövrlərində quşların bağırsaq sağlamlığını və ümumi performansını dəstəkləmək üçün nəzərdə tutulmuş sürətli və stabil postbiotik həllidir. Canlı hüceyrələrə etibar etmir — bu da stresi idarə etməyi asanlaşdırır.</>
    ),
    benefitsHeader: 'ƏSAS ÜSTÜNLÜKLƏR',
    benefits: [
      'Canlı mikroorqanizmlərə ehtiyac olmadan — təsiri stabildir və təkrarlana bilir.',
      'Termal sabitlik — yem emalı və saxlanma zamanı əlavə rahatlıq.',
      'Hədəfli bioaktiv molekullar — sürətli və dəqiq heyvan cavabı.',
      'Antibiotiklərsiz qidalanma strategiyasına uyğundur.',
    ],
    studiesHeader: 'TƏDQİQATLAR GÖSTƏRİR Kİ, EVERWELL PT100:',
    outcomes: [
      { icon: Shield, text: 'Stress altında olan quşların sağlamlığını qoruyur' },
      { icon: Heart,  text: 'Bağırsaq funksiyalarını sabit saxlayır' },
      { icon: Zap,    text: 'Performans itkisini azaldır' },
    ],
    specsHeader: 'MƏHSUL TƏFƏRRÜATLARİ',
    specs: [
      { label: 'Məhsul Nömrəsi',     value: '20657868' },
      { label: 'Tövsiyə olunan doz', value: '0.2 lb/ton' },
      { label: 'Qablaşdırma',        value: '50 lb çuval' },
      { label: 'MOQ',                value: '2,000 lbs' },
      { label: 'Yararlılıq müddəti', value: '12 ay' },
    ],
    studyNote: 'Bədən çəkisi və yem çevrilmə əmsalına dair nəticələrlə bağlı ətraflı tədqiqatları əldə etmək üçün bizimlə əlaqə saxlayın.',
    download: '↓ MƏHSUL LİSTİNİ YÜKLƏ',
    downloadUrl: 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/2b203eb35_EverwellPT100Stresqar.docx',
  },
};

export default function EverwellModal({ open, onClose }) {
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
              background: 'linear-gradient(145deg, rgba(6,12,28,0.97) 0%, rgba(4,10,22,0.99) 100%)',
              border: '1px solid rgba(56,189,248,0.35)',
              boxShadow: '0 0 70px rgba(56,189,248,0.10), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(56,189,248,0.15)', background: 'rgba(56,189,248,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(56,189,248,0.18)', border: '1.5px solid rgba(56,189,248,0.45)', boxShadow: '0 0 14px rgba(56,189,248,0.35)' }}
                >
                  <Shield className="w-4 h-4" style={{ color: '#38bdf8', filter: 'drop-shadow(0 0 5px #38bdf8)' }} />
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px] flex items-baseline gap-0.5">
                    Everwell<sup className="text-[9px] font-bold" style={{ color: '#38bdf8' }}>TM</sup>
                    <span className="ml-1.5 text-white">PT100</span>
                  </div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(56,189,248,0.55)' }}>
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
                style={{ color: 'rgba(56,189,248,0.85)' }}
              >
                {c.tagline}
              </motion.p>

              {/* Key Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl p-4"
                style={{ background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.22)' }}
              >
                <p className="font-orbitron text-[10px] font-bold tracking-wide mb-3" style={{ color: '#38bdf8' }}>{c.benefitsHeader}</p>
                <ul className="space-y-2">
                  {c.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 font-inter text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <span style={{ color: '#38bdf8' }} className="mt-0.5 flex-shrink-0">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Study Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.17 }}
              >
                <p className="font-orbitron text-[10px] font-bold tracking-wide mb-3" style={{ color: 'rgba(56,189,248,0.6)' }}>{c.studiesHeader}</p>
                <div className="space-y-2">
                  {c.outcomes.map(({ icon: Icon, text }, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg px-4 py-3"
                      style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.18)' }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#38bdf8' }} />
                      <span className="font-inter text-xs font-semibold" style={{ color: 'rgba(56,189,248,0.9)' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Product Details Table */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                <p className="font-orbitron text-[10px] tracking-[4px] mb-3" style={{ color: 'rgba(56,189,248,0.6)' }}>{c.specsHeader}</p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(56,189,248,0.2)' }}>
                  <table className="w-full text-xs">
                    <tbody>
                      {c.specs.map(({ label, value }, i) => (
                        <tr key={i} style={{ borderBottom: i < c.specs.length - 1 ? '1px solid rgba(56,189,248,0.08)' : 'none', background: i % 2 === 0 ? 'rgba(56,189,248,0.04)' : 'transparent' }}>
                          <td className="px-4 py-2.5 font-orbitron text-[9px] font-bold tracking-widest whitespace-nowrap" style={{ color: '#38bdf8' }}>{label}</td>
                          <td className="px-4 py-2.5 font-inter" style={{ color: 'rgba(255,255,255,0.55)' }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Study note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-inter text-[11px] italic leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {c.studyNote}
              </motion.p>

              {/* Download */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36 }}
              >
                <a
                  href={c.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all duration-200 hover:opacity-80"
                  style={{ color: 'rgba(56,189,248,0.6)' }}
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