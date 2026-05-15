import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Thermometer, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';

export default function HeroSection() {
  const { t } = useLang();
  const h = t.hero;
  const hud = t.hud || { bodyTemp: 'BƏDƏN İSTİLİYİ', immunity: 'İMMUNİTET', heartRate: 'ÜRƏK DÖYÜNTÜSÜ' };

  const hudData = [
    { label: hud.bodyTemp,  value: '38.6°C',  icon: Thermometer },
    { label: hud.immunity,  value: '97.3%',   icon: Shield },
    { label: hud.heartRate, value: '72 BPM',  icon: Activity },
  ];

  const [counter, setCounter] = useState(2847391);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/5870cdad6_generated_107f9d5a.png"
          alt="Majestic bull in natural light"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Neon dot grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(174 100% 54%) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ boxShadow: '0 0 8px hsl(174 100% 54%)' }} />
            <span className="font-mono text-xs tracking-widest text-primary">
              {h.tag} — LAT 41.40 / LNG 2.17 — {new Date().toISOString().slice(0, 10)}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">{h.title1}</span>
            <br />
            <span className="text-primary" style={{ textShadow: '0 0 30px hsl(174 100% 54% / 0.5)' }}>{h.title2}</span>
            <br />
            <span className="text-foreground">{h.title3}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-inter text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#catalog">
              <Button
                className="glow-pulse font-orbitron text-xs tracking-widest px-8 py-6 rounded-lg"
                style={{
                  background: 'hsl(174 100% 54%)',
                  color: 'hsl(220 20% 6%)',
                  fontWeight: 700,
                }}
              >
                {h.cta1}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="#efficacy">
              <Button
                variant="outline"
                className="font-orbitron text-xs tracking-widest px-8 py-6 rounded-lg"
                style={{
                  borderColor: 'hsl(174 100% 54% / 0.4)',
                  color: 'hsl(174 100% 54%)',
                  background: 'transparent',
                }}
              >
                {h.cta2}
              </Button>
            </a>
          </motion.div>
        </div>

        {/* HUD overlay */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-4 drop-shadow-xl"
        >
          {hudData.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.2 }}
              className="glass rounded-lg px-5 py-3 flex items-center gap-4 min-w-[200px]"
              style={{ boxShadow: '0 0 20px hsl(174 100% 54% / 0.08)' }}
            >
              <item.icon className="w-4 h-4 text-primary" style={{ filter: 'drop-shadow(0 0 4px hsl(174 100% 54% / 0.8))' }} />
              <div>
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">{item.label}</div>
                <div className="font-orbitron text-sm font-bold text-foreground">{item.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-6 right-6 flex items-center justify-between"
        >
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {h.doses}: <span className="text-primary font-bold">{counter.toLocaleString()}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ boxShadow: '0 0 6px hsl(174 100% 54%)' }} />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">{h.coldChain}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}