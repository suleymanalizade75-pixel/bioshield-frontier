import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';
import { SPECIES_ILLUSTRATIONS } from '@/lib/illustrationData';

const SPECIES_EMOJI = {
  'Bovine': '🐄', 'Porcine': '🐷', 'Ovine': '🐑', 'Poultry': '🐔',
  'Equine': '🐴', 'Caprine': '🐐', 'Canine': '🐕', 'Feline': '🐈',
  'Aquaculture': '🐠', 'Bees': '🐝'
};

export default function ComparisonCard({ vaccine, position }) {
  const isLeft = position === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: position * 0.1 }}
      className="rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent"
    >
      {/* Hero Section */}
      {vaccine.species?.[0] && SPECIES_ILLUSTRATIONS[vaccine.species[0]] && (
        <div className="relative h-48 overflow-hidden bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center">
          <img
            src={SPECIES_ILLUSTRATIONS[vaccine.species[0]]}
            alt={vaccine.species[0]}
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title & Efficacy */}
        <div>
          <h3 className="font-orbitron text-xl font-bold text-foreground">{vaccine.name}</h3>
          {vaccine.efficacy_rate && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all"
                  style={{ width: `${vaccine.efficacy_rate}%` }}
                />
              </div>
              <span className="font-orbitron font-bold text-primary text-sm">{vaccine.efficacy_rate}%</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-400 line-clamp-2">{vaccine.description}</p>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10">
          <div>
            <p className="text-xs font-orbitron text-muted-foreground mb-1">DOSAGE FORM</p>
            <p className="text-sm font-semibold text-foreground">{vaccine.dosage_form?.replace('Injectable - ', '')}</p>
          </div>
          <div>
            <p className="text-xs font-orbitron text-muted-foreground mb-1">PRICE</p>
            <p className="text-sm font-semibold text-primary">${vaccine.price?.toFixed(2)}</p>
          </div>
        </div>

        {/* Features */}
        {vaccine.features?.length > 0 && (
          <div>
            <p className="text-xs font-orbitron font-bold text-muted-foreground mb-2">KEY FEATURES</p>
            <ul className="space-y-1">
              {vaccine.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Species Coverage */}
        <div>
          <p className="text-xs font-orbitron font-bold text-muted-foreground mb-3">SPECIES COVERAGE ({vaccine.species?.length})</p>
          <div className="grid grid-cols-2 gap-2">
            {vaccine.species?.map((species) => (
              <div
                key={species}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-center text-xs font-orbitron"
              >
                <span className="text-lg block mb-1">{SPECIES_EMOJI[species]}</span>
                <span className="text-foreground text-xs">{species}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}