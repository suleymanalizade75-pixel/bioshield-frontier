import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Truck, FlaskConical } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const ICONS = [Shield, FlaskConical, Truck, Zap];

export default function EfficacySection() {
  const { t } = useLang();
  const e = t.efficacy;

  return (
    <section id="efficacy" className="relative py-32 px-6">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.04] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
            {e.tag}
          </div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            {e.title}
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {e.stats.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass rounded-xl p-6 text-center group hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_24px_hsl(174_100%_54%/0.1)]"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:drop-shadow-[0_0_6px_hsl(174_100%_54%/0.8)] transition-all duration-300" />
                <div className="font-orbitron text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                  {stat.value}
                </div>
                <div className="font-mono text-[8px] tracking-[2px] text-muted-foreground leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Protection Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-orbitron text-lg font-bold text-foreground mb-8 tracking-wide">
            {e.timelineTitle}
          </h3>
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-px bg-border hidden md:block" />
            <div
              className="absolute top-6 left-0 h-px bg-gradient-to-r from-primary via-primary to-transparent hidden md:block"
              style={{ width: '100%', boxShadow: '0 0 8px hsl(174 100% 54% / 0.6)' }}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {e.milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-3 h-3 rounded-full bg-primary mb-6 relative z-10 hidden md:block"
                    style={{ boxShadow: '0 0 10px hsl(174 100% 54% / 0.8)' }}>
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-primary mb-1">
                    {m.day}
                  </div>
                  <div className="font-orbitron text-sm font-bold text-foreground mb-1">
                    {m.label}
                  </div>
                  <div className="font-inter text-xs text-muted-foreground leading-relaxed">
                    {m.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}