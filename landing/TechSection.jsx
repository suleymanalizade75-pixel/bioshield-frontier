import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Snowflake, BarChart3, Globe2, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import DosingModal from './DosingModal';

const icons = [Microscope, Snowflake, BarChart3, Globe2];

export default function TechSection() {
  const { t } = useLang();
  const tech = t.tech;
  const [dosingOpen, setDosingOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="technology" className="relative py-32 px-6">
      {/* Neon dot grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(174 100% 54%) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      {/* Corner accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
            {tech.tag}
          </div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            {tech.title}
          </h2>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-primary tracking-tight">
            {tech.title2}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tech.features.map((feature, i) => {
            const Icon = icons[i];
            const isDosing = i === 2;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={isDosing ? () => setDosingOpen(true) : undefined}
                className={`scanline-hover group relative glass rounded-xl p-8 transition-all duration-500 ${
                  isDosing ? 'cursor-pointer' : ''
                } ${isHovered ? 'border-primary/40 shadow-[0_0_30px_hsl(174_100%_54%/0.12)]' : ''}`}
                style={{
                  borderColor: isHovered ? 'hsl(174 100% 54% / 0.4)' : undefined,
                }}
              >
                {/* Corner bracket decoration */}
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/30 transition-all duration-300 group-hover:border-primary/70 group-hover:w-6 group-hover:h-6" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/30 transition-all duration-300 group-hover:border-primary/70 group-hover:w-6 group-hover:h-6" />

                {/* Active glow line at top */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                <div className="flex items-start gap-5">
                  <motion.div
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isHovered
                        ? 'bg-primary/20 shadow-[0_0_16px_hsl(174_100%_54%/0.4)]'
                        : 'bg-primary/10'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-orbitron text-sm font-bold text-foreground tracking-wide">
                        {feature.title}
                      </h3>
                      {isDosing && (
                        <span className="flex items-center gap-0.5 font-mono text-[9px] tracking-widest text-primary animate-pulse">
                          ▸ {t.tech?.tryLabel || 'SINAYIN'}
                        </span>
                      )}
                    </div>
                    <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {isDosing && (
                      <motion.div
                        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-primary"
                      >
                        <ChevronRight className="w-3 h-3" />
                        {t.tech?.launchDosing || 'DOZALAMA KALKULYATORUNU AÇIN'}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Scan line at bottom on hover */}
                <motion.div
                  animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <DosingModal open={dosingOpen} onClose={() => setDosingOpen(false)} />
    </section>
  );
}