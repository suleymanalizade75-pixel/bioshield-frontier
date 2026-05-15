import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Wheat, Dna, X, ChevronRight, Pill, Zap } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import PoultryFormModal from './PoultryFormModal';
import CattleFormModal from './CattleFormModal';
import SwineFormModal from './SwineFormModal';
import AquacultureFormModal from './AquacultureFormModal';
import BeesFormModal from './BeesFormModal';
import SheepFormModal from './SheepFormModal';
import GoatFormModal from './GoatFormModal';

// ─── Animation keyframes ───────────────────────────────────────────────────
const WAVE_ANIM = {
  poultry:     'wavePoultry',
  ovine:       'waveOvine',
  caprine:     'waveCaprine',
  bovine:      'waveBovine',
  porcine:     'wavePorcine',
  aquaculture: 'waveAqua',
  apiculture:  'waveApi',
};

const WAVE_BG = {
  poultry:     'linear-gradient(120deg,rgba(35,75,14,.55),rgba(72,120,25,.48),rgba(50,95,18,.58),rgba(90,140,30,.45),rgba(35,75,14,.55))',
  ovine:       'linear-gradient(120deg,rgba(35,75,14,.55),rgba(72,120,25,.48),rgba(50,95,18,.58),rgba(90,140,30,.45),rgba(35,75,14,.55))',
  caprine:     'linear-gradient(120deg,rgba(130,95,30,.52),rgba(185,145,55,.46),rgba(155,120,40,.54),rgba(200,160,65,.44),rgba(130,95,30,.52))',
  bovine:      'linear-gradient(120deg,rgba(45,85,18,.52),rgba(80,130,32,.46),rgba(55,100,20,.56),rgba(95,150,38,.42),rgba(45,85,18,.52))',
  porcine:     'linear-gradient(120deg,rgba(38,78,15,.55),rgba(68,112,22,.50),rgba(48,92,17,.58),rgba(82,135,28,.46),rgba(38,78,15,.55))',
  aquaculture: 'linear-gradient(120deg,rgba(14,55,85,.55),rgba(22,95,140,.48),rgba(18,70,110,.58),rgba(28,110,160,.45),rgba(14,55,85,.55))',
  apiculture:  'linear-gradient(120deg,rgba(85,65,10,.55),rgba(160,120,18,.48),rgba(110,85,14,.58),rgba(180,140,22,.45),rgba(85,65,10,.55))',
};

const styles = `
  @keyframes wavePoultry {
    0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
  }
  @keyframes waveBovine {
    0%{background-position:0% 30%} 50%{background-position:100% 70%} 100%{background-position:0% 30%}
  }
  @keyframes wavePorcine {
    0%{background-position:20% 0%} 50%{background-position:80% 100%} 100%{background-position:20% 0%}
  }
  @keyframes waveOvine {
    0%{background-position:0% 40%} 50%{background-position:100% 60%} 100%{background-position:0% 40%}
  }
  @keyframes waveCaprine {
    0%{background-position:30% 0%} 50%{background-position:70% 100%} 100%{background-position:30% 0%}
  }
  @keyframes waveAqua {
    0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
  }
  @keyframes waveApi {
    0%{background-position:50% 0%} 50%{background-position:50% 100%} 100%{background-position:50% 0%}
  }
  @keyframes trinityPulse {
    0%,100%{box-shadow:0 0 12px rgba(255,255,255,.15),0 0 24px var(--gem-glow,.3)} 
    50%{box-shadow:0 0 20px rgba(255,255,255,.25),0 0 40px var(--gem-glow,.5)}
  }
  .trinity-btn { animation: trinityPulse 2s ease-in-out infinite; }
`;

// ─── Data (form solutions only) ────────────────────────────────────────────
const animals = [
  {
    id: 'poultry', label: 'POULTRY', species: 'Broilers, Layers & Turkeys',
    image: 'https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/345832ff6_generated_image.png',
    color: '#5A8C2A', accentBorder: '#7FB553',
  },
  {
    id: 'ovine', label: 'SHEEP', species: 'Dairy, Meat & Lambs',
    image: 'https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/9601661fa_generated_image.png',
    color: '#7A8F45', accentBorder: '#9AA85C',
  },
  {
    id: 'caprine', label: 'GOATS', species: 'Dairy, Meat & Kids',
    image: 'https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/933d011e7_generated_image.png',
    color: '#7A8F45', accentBorder: '#9AA85C',
  },
  {
    id: 'bovine', label: 'CATTLE', species: 'Dairy, Beef & Calves',
    image: 'https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/d6acc46d4_generated_image.png',
    color: '#6B9E30', accentBorder: '#88B84A',
  },
  {
    id: 'porcine', label: 'SWINE', species: 'Sows, Piglets & Finishers',
    image: 'https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/c72089636_generated_image.png',
    color: '#5A8C2A', accentBorder: '#7FB553',
  },
  {
    id: 'aquaculture', label: 'AQUACULTURE', species: 'Fish, Shrimp & Crustaceans',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    color: '#1A82C0', accentBorder: '#3AAEE0',
  },
  {
    id: 'apiculture', label: 'BEES', species: 'Honey, Solitary & Queen Bees',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    color: '#C89010', accentBorder: '#E8B030',
  },
];

// ─── Form config ───────────────────────────────────────────────────────────
const FORM_ITEM = {
  key: 'form', Icon: Dna,
  gemColor: '#1a4fc0', gemGlow: 'rgba(26,79,192,0.6)',
  bg: 'linear-gradient(135deg,#080d3a,#142080,#080d3a)',
};

// ─── AnimalBlock ───────────────────────────────────────────────────────────
function AnimalBlock({ animal, index, displayLabel, buttonLabel, onPoultryForm, onSheepForm, onGoatForm, onCattleForm, onSwineForm, onAquacultureForm, onBeesForm, anyModalOpen }) {
  const [hovered, setHovered]       = useState(false);
  const [locked, setLocked]         = useState(false);
  const direction = index % 2 === 0 ? 1 : -1;

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    if (!locked) {
      setHovered(false);
    }
  };

  const handleClose = () => {
    setLocked(false);
    setHovered(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer group"
      style={{ height: '176px', transition: 'height .4s cubic-bezier(.45,.05,.55,.95)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Background photo */}
      <img
        src={animal.image} alt={animal.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/50" />

      {/* Background text — hidden on hover or lock */}
      <div
        className="absolute inset-0 flex items-center px-10 pointer-events-none z-10 transition-opacity duration-200"
        style={{ opacity: (hovered || locked || anyModalOpen) ? 0 : 1 }}
      >
        <div>
          <div className="font-mono text-[10px] tracking-[5px] mb-1 whitespace-nowrap" style={{ color: animal.color }}>
            {animal.species}
          </div>
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            {displayLabel || animal.label}
          </h3>
        </div>
        <div className="ml-auto">
          <ArrowRight className="w-5 h-5" style={{ color: animal.color, opacity: 0.5 }} />
        </div>
      </div>

      {/* Living Glass curtain */}
      <motion.div
        initial={false}
        animate={{ x: (hovered || locked) ? '0%' : `${direction * 100}%` }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex flex-col justify-center px-8"
        style={{
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderLeft: `2px solid ${animal.accentBorder}60`,
          borderRight: `2px solid ${animal.accentBorder}60`,
        }}
      >
        {/* Wind-wave bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: WAVE_BG[animal.id] || WAVE_BG.poultry,
          backgroundSize: '400% 400%',
          animation: (hovered || locked) ? `${WAVE_ANIM[animal.id] || 'wavePoultry'} 5s cubic-bezier(.45,.05,.55,.95) infinite` : 'none',
          backgroundPosition: '0% 50%',
        }} />

        <div className="relative z-10 w-full">
          <AnimatePresence mode="wait">
            {!hovered && !locked ? (
              <div />
            ) : (
              /* FORM Button - opens modal */
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                   onClick={(e) => {
                     e.stopPropagation();
                     if (animal.id === 'poultry') onPoultryForm();
                     if (animal.id === 'ovine') onSheepForm();
                     if (animal.id === 'caprine') onGoatForm();
                     if (animal.id === 'bovine') onCattleForm();
                     if (animal.id === 'porcine') onSwineForm();
                     if (animal.id === 'aquaculture') onAquacultureForm();
                     if (animal.id === 'apiculture') onBeesForm();
                   }}
                  className="trinity-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-orbitron text-[11px] tracking-widest font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: FORM_ITEM.bg,
                    border: `1.5px solid ${FORM_ITEM.gemColor}80`,
                    '--gem-glow': FORM_ITEM.gemGlow,
                    boxShadow: `0 0 14px ${FORM_ITEM.gemGlow}, inset 0 1px 0 rgba(255,255,255,.15)`,
                  }}
                >
                  <Dna className="w-3.5 h-3.5" style={{ color: FORM_ITEM.gemColor, filter: `drop-shadow(0 0 4px ${FORM_ITEM.gemColor})` }} />
                  {buttonLabel}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Accent border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${animal.color}50,transparent)` }} />
    </div>
  );
}

const SPECIES_KEY = { poultry: 'poultry', ovine: 'ovine', caprine: 'caprine', bovine: 'cattle', porcine: 'swine', aquaculture: 'aquaculture', apiculture: 'bees' };

// ─── Main Section ──────────────────────────────────────────────────────────
export default function FormSection() {
   const { t, lang } = useLang();
   const ad = t.additives;
  const [poultryFormOpen, setPoultryFormOpen] = useState(false);
  const [cattleFormOpen, setCattleFormOpen] = useState(false);
  const [swineFormOpen, setSwineFormOpen] = useState(false);
  const [aquacultureFormOpen, setAquacultureFormOpen] = useState(false);
  const [beesFormOpen, setBeesFormOpen] = useState(false);
  const [sheepFormOpen, setSheepFormOpen] = useState(false);
  const [goatFormOpen, setGoatFormOpen] = useState(false);

  return (
    <section id="form" className="relative py-32">
      <style>{styles}</style>
      <PoultryFormModal open={poultryFormOpen} onClose={() => setPoultryFormOpen(false)} />
      <CattleFormModal open={cattleFormOpen} onClose={() => setCattleFormOpen(false)} />
      <SwineFormModal open={swineFormOpen} onClose={() => setSwineFormOpen(false)} />
      <AquacultureFormModal open={aquacultureFormOpen} onClose={() => setAquacultureFormOpen(false)} />
      <BeesFormModal open={beesFormOpen} onClose={() => setBeesFormOpen(false)} />
      <SheepFormModal open={sheepFormOpen} onClose={() => setSheepFormOpen(false)} />
      <GoatFormModal open={goatFormOpen} onClose={() => setGoatFormOpen(false)} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
          {ad.formTag}
        </div>
        <h2 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tight">
          <span style={{ color: '#1a4fc0' }}>{ad.formTitle}</span>
        </h2>
        <p className="font-inter text-muted-foreground mt-4 max-w-xl leading-relaxed">
          {ad.formSubtitle}
        </p>
      </div>

      {/* Species blocks */}
      <div className="flex flex-col w-full border-t border-border/30">
        {animals.map((animal, i) => {
          const speciesLabel = t.animals[animal.id];
          const displayLabel = speciesLabel?.label || animal.label;
          const displaySpecies = speciesLabel?.species || animal.species;
          return (
            <AnimalBlock key={animal.id} animal={{ ...animal, label: displayLabel, species: displaySpecies }} index={i}
              displayLabel={displayLabel}
              buttonLabel={ad.farmButton || 'Farm'}
              onPoultryForm={() => setPoultryFormOpen(true)} onSheepForm={() => setSheepFormOpen(true)} onGoatForm={() => setGoatFormOpen(true)} onCattleForm={() => setCattleFormOpen(true)} onSwineForm={() => setSwineFormOpen(true)} onAquacultureForm={() => setAquacultureFormOpen(true)} onBeesForm={() => setBeesFormOpen(true)} anyModalOpen={poultryFormOpen || sheepFormOpen || goatFormOpen || cattleFormOpen || swineFormOpen || aquacultureFormOpen || beesFormOpen} />
          );
        })}
      </div>
    </section>
  );
}