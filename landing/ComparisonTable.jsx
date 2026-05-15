import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const diseases = [
  { name: 'E. coli (K99+)', firstDefense: true,  triShield: true },
  { name: 'Coronavirus',    firstDefense: true,  triShield: true },
  { name: 'Rotavirus',      firstDefense: false, triShield: true },
];

const defaultSpecs = [
  { label: 'Effektivlik Dərəcəsi',        firstDefense: '100%',    triShield: '100%' },
  { label: 'İmmunitet Başlanğıcı',         firstDefense: 'Doğumda', triShield: 'Doğumda' },
  { label: 'Tətbiq Üsulu',                 firstDefense: 'Bolus',   triShield: 'Gel Borusu' },
  { label: 'Paketdə Doza',                 firstDefense: '1',       triShield: '1' },
  { label: 'USDA Təsdiqlənmiş',            firstDefense: '✓',       triShield: '✓' },
  { label: 'Patogen Tullantısını Azaldır', firstDefense: '—',       triShield: 'Rotavirus' },
];

export default function ComparisonTable() {
  const { t } = useLang();
  const comp = t.comparison;
  const specs = comp?.specs || defaultSpecs;

  return (
    <section id="comparison" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
            {comp.tag}
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {comp.title}
          </h2>
          <p className="font-inter text-muted-foreground mt-3 max-w-lg leading-relaxed">
            {comp.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 0 40px hsl(174 100% 54% / 0.08)' }}
        >
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-border/50">
            <div className="p-5 border-r border-border/50" />
            <div className="p-5 border-r border-border/50 text-center">
              <div className="font-orbitron text-xs font-bold text-foreground tracking-widest mb-1">FIRST DEFENSE®</div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-wider">2 {comp.diseaseCoverage?.split(' ')[0] === 'XƏSTƏLİK' ? 'xəstəlik' : 'diseases'}</div>
            </div>
            <div className="p-5 text-center" style={{ background: 'hsl(174 100% 54% / 0.05)' }}>
              <div className="font-orbitron text-xs font-bold text-primary tracking-widest mb-1">TRI-SHIELD®</div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-wider">3 {comp.diseaseCoverage?.split(' ')[0] === 'XƏSTƏLİK' ? 'xəstəlik' : 'diseases'}</div>
            </div>
          </div>

          {/* Disease Coverage */}
          <div className="border-b border-border/50">
            <div className="grid grid-cols-3 px-5 py-3" style={{ background: 'hsl(220 15% 12%)' }}>
              <div className="font-mono text-[10px] tracking-[3px] text-muted-foreground col-span-3">{comp.diseaseCoverage}</div>
            </div>
            {diseases.map((d, i) => (
              <div key={d.name} className={`grid grid-cols-3 border-t border-border/30 ${i % 2 !== 0 ? 'bg-card/50' : ''}`}>
                <div className="p-4 border-r border-border/30 font-inter text-sm text-foreground flex items-center">{d.name}</div>
                <div className="p-4 border-r border-border/30 flex items-center justify-center">
                  {d.firstDefense
                    ? <CheckCircle2 className="w-5 h-5 text-primary" style={{ filter: 'drop-shadow(0 0 4px hsl(174 100% 54% / 0.6))' }} />
                    : <XCircle className="w-5 h-5 text-muted-foreground/30" />}
                </div>
                <div className="p-4 flex items-center justify-center" style={{ background: 'hsl(174 100% 54% / 0.04)' }}>
                  {d.triShield
                    ? <CheckCircle2 className="w-5 h-5 text-primary" style={{ filter: 'drop-shadow(0 0 4px hsl(174 100% 54% / 0.6))' }} />
                    : <XCircle className="w-5 h-5 text-muted-foreground/30" />}
                </div>
              </div>
            ))}
          </div>

          {/* Specs */}
          <div>
            <div className="grid grid-cols-3 px-5 py-3" style={{ background: 'hsl(220 15% 12%)' }}>
              <div className="font-mono text-[10px] tracking-[3px] text-muted-foreground col-span-3">{comp.specifications}</div>
            </div>
            {specs.map((s, i) => (
              <div key={s.label} className={`grid grid-cols-3 border-t border-border/30 ${i % 2 !== 0 ? 'bg-card/50' : ''}`}>
                <div className="p-4 border-r border-border/30 font-inter text-sm text-muted-foreground flex items-center">{s.label}</div>
                <div className="p-4 border-r border-border/30 font-inter text-sm text-foreground flex items-center justify-center text-center">{s.firstDefense}</div>
                <div className="p-4 font-inter text-sm text-primary font-medium flex items-center justify-center text-center" style={{ background: 'hsl(174 100% 54% / 0.04)' }}>{s.triShield}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}