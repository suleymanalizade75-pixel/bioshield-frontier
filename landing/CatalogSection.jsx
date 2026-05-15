import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import VaccineCard from './VaccineCard';
import { Loader2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const SPECIES_FILTERS_AZ = ['HAMISI', 'QARAMAL', 'DONUZ', 'QOYUN', 'QUŞÇULUQ', 'AT'];
const SPECIES_FILTERS_EN = ['ALL', 'BOVINE', 'PORCINE', 'OVINE', 'POULTRY', 'EQUINE'];

export default function CatalogSection() {
  const { t, lang } = useLang();
  const cat = t.catalog;
  const [activeFilterIdx, setActiveFilterIdx] = useState(0);

  const speciesFiltersDisplay = lang === 'AZ' ? SPECIES_FILTERS_AZ : lang === 'RU' ? ['ВСЕ', 'КРС', 'СВИНЬЯ', 'ОВЦА', 'ПТИЦА', 'ЛОШАДЬ'] : SPECIES_FILTERS_EN;

  const { data: vaccines = [], isLoading } = useQuery({
    queryKey: ['vaccines'],
    queryFn: () => base44.entities.Vaccine.list(),
  });

  const filtered = activeFilterIdx === 0
    ? vaccines
    : vaccines.filter(v => v.species?.toUpperCase() === SPECIES_FILTERS_EN[activeFilterIdx]);

  return (
    <section id="catalog" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
            {cat.tag}
          </div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            {cat.title}
          </h2>
          <p className="font-inter text-muted-foreground mt-4 max-w-lg leading-relaxed">
            {cat.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {speciesFiltersDisplay.map((f, idx) => (
            <button
              key={f}
              onClick={() => setActiveFilterIdx(idx)}
              className={`font-orbitron text-[10px] tracking-[3px] px-5 py-2.5 rounded-lg transition-all duration-300 ${
                activeFilterIdx === idx
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-muted-foreground">{cat.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vaccine, i) => (
              <VaccineCard key={vaccine.id} vaccine={vaccine} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}