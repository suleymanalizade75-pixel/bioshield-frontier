import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Wheat, Dna, X, ChevronRight, Pill, Zap } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import PoultryFeedModal from './PoultryFeedModal';
import CattleFeedModal from './CattleFeedModal';
import SwineFeedModal from './SwineFeedModal';
import AquacultureFeedModal from './AquacultureFeedModal';
import BeesFeedModal from './BeesFeedModal';
import SheepFeedModal from './SheepFeedModal';
import GoatFeedModal from './GoatFeedModal';

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

// ─── Data (feed solutions only) ─────────────────────────────────────────────
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

// ─── Feed config ───────────────────────────────────────────────────────────
const FEED_ITEM = {
  key: 'feed', Icon: Wheat,
  gemColor: '#c0392b', gemGlow: 'rgba(192,57,43,0.6)',
  bg: 'linear-gradient(135deg,#4a0808,#a02020,#4a0808)',
};

// ─── Additives config (XVET & Kerry Group) ─────────────────────────────────
const ADDITIVES_ITEM = {
  key: 'additives', Icon: Pill,
  gemColor: '#27ae60', gemGlow: 'rgba(39,174,96,0.6)',
  bg: 'linear-gradient(135deg,#0d3d20,#1a6b38,#0d3d20)',
};

// ─── AnimalBlock ───────────────────────────────────────────────────────────
function AnimalBlock({ animal, index, displayLabel, buttonLabel, onPoultryFeed, onSheepFeed, onGoatFeed, onCattleFeed, onSwineFeed, onAquacultureFeed, onBeesFeed, onPoultryAdditives, onSheepAdditives, onGoatAdditives, onCattleAdditives, onSwineAdditives, onAquacultureAdditives, onBeesAdditives, mode, anyModalOpen }) {
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
              /* FEED Button - opens modal */
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                   onClick={(e) => {
                     e.stopPropagation();
                     const handler = mode === 'additives' 
                       ? { poultry: onPoultryAdditives, ovine: onSheepAdditives, caprine: onGoatAdditives, bovine: onCattleAdditives, porcine: onSwineAdditives, aquaculture: onAquacultureAdditives, apiculture: onBeesAdditives }[animal.id]
                       : { poultry: onPoultryFeed, ovine: onSheepFeed, caprine: onGoatFeed, bovine: onCattleFeed, porcine: onSwineFeed, aquaculture: onAquacultureFeed, apiculture: onBeesFeed }[animal.id];
                     if (handler) handler();
                   }}
                   className="trinity-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-orbitron text-[11px] tracking-widest font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                   style={{
                     background: mode === 'additives' ? ADDITIVES_ITEM.bg : FEED_ITEM.bg,
                     border: `1.5px solid ${(mode === 'additives' ? ADDITIVES_ITEM.gemColor : FEED_ITEM.gemColor)}80`,
                     '--gem-glow': mode === 'additives' ? ADDITIVES_ITEM.gemGlow : FEED_ITEM.gemGlow,
                     boxShadow: `0 0 14px ${mode === 'additives' ? ADDITIVES_ITEM.gemGlow : FEED_ITEM.gemGlow}, inset 0 1px 0 rgba(255,255,255,.15)`,
                   }}
                 >
                   {mode === 'additives' ? <Pill className="w-3.5 h-3.5" style={{ color: ADDITIVES_ITEM.gemColor, filter: `drop-shadow(0 0 4px ${ADDITIVES_ITEM.gemColor})` }} /> : <Wheat className="w-3.5 h-3.5" style={{ color: FEED_ITEM.gemColor, filter: `drop-shadow(0 0 4px ${FEED_ITEM.gemColor})` }} />}
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
export default function FeedSection() {
   const { t, lang } = useLang();
   const ad = t.additives;
  const [poultryFeedOpen, setPoultryFeedOpen] = useState(false);
  const [cattleFeedOpen, setCattleFeedOpen] = useState(false);
  const [swineFeedOpen, setSwineFeedOpen] = useState(false);
  const [aquacultureFeedOpen, setAquacultureFeedOpen] = useState(false);
  const [beesFeedOpen, setBeesFeedOpen] = useState(false);
  const [sheepFeedOpen, setSheepFeedOpen] = useState(false);
  const [goatFeedOpen, setGoatFeedOpen] = useState(false);

  const [poultryAdditivesOpen, setPoultryAdditivesOpen] = useState(false);
  const [cattleAdditivesOpen, setCattleAdditivesOpen] = useState(false);
  const [swineAdditivesOpen, setSwineAdditivesOpen] = useState(false);
  const [aquacultureAdditivesOpen, setAquacultureAdditivesOpen] = useState(false);
  const [beesAdditivesOpen, setBeesAdditivesOpen] = useState(false);
  const [sheepAdditivesOpen, setSheepAdditivesOpen] = useState(false);
  const [goatAdditivesOpen, setGoatAdditivesOpen] = useState(false);

  return (
    <>
      {/* FEED SECTION */}
      <section id="feed" className="relative py-32">
        <style>{styles}</style>
        <PoultryFeedModal open={poultryFeedOpen} onClose={() => setPoultryFeedOpen(false)} />
        <CattleFeedModal open={cattleFeedOpen} onClose={() => setCattleFeedOpen(false)} />
        <SwineFeedModal open={swineFeedOpen} onClose={() => setSwineFeedOpen(false)} />
        <AquacultureFeedModal open={aquacultureFeedOpen} onClose={() => setAquacultureFeedOpen(false)} />
        <BeesFeedModal open={beesFeedOpen} onClose={() => setBeesFeedOpen(false)} />
        <SheepFeedModal open={sheepFeedOpen} onClose={() => setSheepFeedOpen(false)} />
        <GoatFeedModal open={goatFeedOpen} onClose={() => setGoatFeedOpen(false)} />

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
            {ad.feedTag}
          </div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tight">
            <span style={{ color: '#c0392b' }}>{ad.feedTitle}</span>
          </h2>
          <p className="font-inter text-muted-foreground mt-4 max-w-xl leading-relaxed">
            {ad.feedSubtitle}
          </p>
        </div>

        {/* Species blocks */}
        <div className="flex flex-col w-full border-t border-border/30">
          {animals.map((animal, i) => {
            const speciesLabel = t.animals[animal.id];
            const displayLabel = speciesLabel?.label || animal.label;
            const displaySpecies = speciesLabel?.species || animal.species;
            return (
              <AnimalBlock key={animal.id + '-feed'} animal={{ ...animal, label: displayLabel, species: displaySpecies }} index={i}
                displayLabel={displayLabel}
                buttonLabel={ad.feedButton || 'Feed'}
                mode="feed"
                onPoultryFeed={() => setPoultryFeedOpen(true)} onSheepFeed={() => setSheepFeedOpen(true)} onGoatFeed={() => setGoatFeedOpen(true)} onCattleFeed={() => setCattleFeedOpen(true)} onSwineFeed={() => setSwineFeedOpen(true)} onAquacultureFeed={() => setAquacultureFeedOpen(true)} onBeesFeed={() => setBeesFeedOpen(true)} onPoultryAdditives={() => {}} onSheepAdditives={() => {}} onGoatAdditives={() => {}} onCattleAdditives={() => {}} onSwineAdditives={() => {}} onAquacultureAdditives={() => {}} onBeesAdditives={() => {}} anyModalOpen={poultryFeedOpen || sheepFeedOpen || goatFeedOpen || cattleFeedOpen || swineFeedOpen || aquacultureFeedOpen || beesFeedOpen} />
            );
          })}
        </div>
      </section>

      {/* ADDITIVES SECTION (XVET & Kerry) */}
      <section id="additives-feed" className="relative py-32">
        <style>{styles}</style>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
            {ad.tag}
          </div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tight">
            <span style={{ color: '#27ae60' }}>{ad.title}</span>
          </h2>
          <p className="font-inter text-muted-foreground mt-4 max-w-xl leading-relaxed">
            {ad.subtitle}
          </p>
        </div>

        {/* Species blocks */}
        <div className="flex flex-col w-full border-t border-border/30">
          {animals.map((animal, i) => {
            const speciesLabel = t.animals[animal.id];
            const displayLabel = speciesLabel?.label || animal.label;
            const displaySpecies = speciesLabel?.species || animal.species;
            return (
              <AnimalBlock key={animal.id + '-additives'} animal={{ ...animal, label: displayLabel, species: displaySpecies }} index={i}
                displayLabel={displayLabel}
                buttonLabel={ad.healthButton || 'Health'}
                mode="additives"
                onPoultryAdditives={() => setPoultryAdditivesOpen(true)} onSheepAdditives={() => setSheepAdditivesOpen(true)} onGoatAdditives={() => setGoatAdditivesOpen(true)} onCattleAdditives={() => setCattleAdditivesOpen(true)} onSwineAdditives={() => setSwineAdditivesOpen(true)} onAquacultureAdditives={() => setAquacultureAdditivesOpen(true)} onBeesAdditives={() => setBeesAdditivesOpen(true)} onPoultryFeed={() => {}} onSheepFeed={() => {}} onGoatFeed={() => {}} onCattleFeed={() => {}} onSwineFeed={() => {}} onAquacultureFeed={() => {}} onBeesFeed={() => {}} anyModalOpen={poultryAdditivesOpen || sheepAdditivesOpen || goatAdditivesOpen || cattleAdditivesOpen || swineAdditivesOpen || aquacultureAdditivesOpen || beesAdditivesOpen} />
            );
          })}
        </div>
      </section>
    </>
  );
}