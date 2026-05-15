import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Syringe, ArrowUpRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const SPECIES_AZ = {
  bovine: 'QARAMAL', porcine: 'DONUZ', ovine: 'QOYUN',
  poultry: 'QUŞÇULUQ', equine: 'AT', caprine: 'KEÇİ',
};
const SPECIES_RU = {
  bovine: 'КРС', porcine: 'СВИНЬЯ', ovine: 'ОВЦА',
  poultry: 'ПТИЦА', equine: 'ЛОШАДЬ', caprine: 'КОЗА',
};

const speciesColors = {
  bovine:  'text-primary', porcine: 'text-accent', ovine: 'text-chart-4',
  poultry: 'text-chart-5', equine:  'text-chart-2', caprine: 'text-muted-foreground',
};

export default function VaccineCard({ vaccine, index }) {
  const { t, lang } = useLang();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const speciesLabel = lang === 'AZ'
    ? (SPECIES_AZ[vaccine.species] || vaccine.species?.toUpperCase())
    : lang === 'RU'
    ? (SPECIES_RU[vaccine.species] || vaccine.species?.toUpperCase())
    : vaccine.species?.toUpperCase();

  const dosageLabel = lang === 'AZ' ? 'DOZA' : lang === 'RU' ? 'ДОЗА' : 'DOSAGE';
  const tempLabel = lang === 'AZ' ? 'TEMP' : lang === 'RU' ? 'ТЕМП' : 'TEMP';
  const efficacyLabel = lang === 'AZ' ? 'EFFEKTİVLİK' : lang === 'RU' ? 'ЭФФЕКТ' : 'EFFICACY';
  const protectionLabel = lang === 'AZ' ? 'Qorunma:' : lang === 'RU' ? 'Защита от:' : 'Protection against';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product?id=${vaccine.id}`}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="scanline-hover group relative rounded-xl overflow-hidden cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          <div
            className="glass rounded-xl p-1 transition-all duration-300 ease-out hover:border-primary/50 hover:shadow-[0_0_30px_hsl(174_100%_54%/0.15)]"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            {/* Image */}
            <div className="relative h-48 rounded-t-lg overflow-hidden bg-secondary">
              {vaccine.image_url && !imgError ? (
                <img
                  src={vaccine.image_url}
                  alt={vaccine.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <Syringe className="w-12 h-12 text-muted-foreground/30" />
                  <span className="font-mono text-[9px] tracking-widest text-muted-foreground/40">{vaccine.name}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-primary/60">
                {vaccine.code || `BSF-${String(vaccine.id).slice(-4)}`}
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-primary" style={{ filter: 'drop-shadow(0 0 4px hsl(174 100% 54% / 0.8))' }} />
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className={`font-mono text-[10px] tracking-[3px] uppercase mb-2 ${speciesColors[vaccine.species] || 'text-muted-foreground'}`}>
                {speciesLabel}
              </div>
              <h3 className="font-orbitron text-sm font-bold text-foreground mb-2 tracking-wide">
                {vaccine.name}
              </h3>
              <p className="font-inter text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {vaccine.disease ? `${protectionLabel} ${vaccine.disease}` : vaccine.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50 opacity-60 group-hover:opacity-100 transition-opacity">
                <div>
                  <div className="font-mono text-[9px] text-muted-foreground tracking-wider">{dosageLabel}</div>
                  <div className="font-mono text-[11px] text-foreground">{vaccine.dosage || '2ml'}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-muted-foreground tracking-wider">{tempLabel}</div>
                  <div className="font-mono text-[11px] text-foreground">{vaccine.storage_temp || '2-8°C'}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-muted-foreground tracking-wider">{efficacyLabel}</div>
                  <div className="font-mono text-[11px] text-primary">{vaccine.efficacy_rate || 95}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}