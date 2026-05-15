import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Microscope } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { getTechHudText } from '@/lib/techHudI18n';

export default function TechHUD() {
  const [scrollY, setScrollY] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated metric cards with proactive movement
  const metrics = [
    { icon: Activity, label: getTechHudText('realTimeAnalytics', lang), value: '98.7%', color: '#00ff88' },
    { icon: Shield, label: getTechHudText('dataSecurity', lang), value: '100%', color: '#00d4ff' },
    { icon: Zap, label: getTechHudText('systemPerformance', lang), value: '99.2%', color: '#ffd700' },
    { icon: Microscope, label: getTechHudText('researchGrade', lang), value: '⭐⭐⭐⭐⭐', color: '#ff006e' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(90deg, hsl(174 100% 54% / 0.1) 1px, transparent 1px), linear-gradient(0deg, hsl(174 100% 54% / 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          y: scrollY * 0.5,
        }}
      />

      {/* Top-left: Data stream indicator */}
      <motion.div
        className="absolute top-20 left-8 pointer-events-auto"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg" />
          <div className="relative bg-gradient-to-b from-primary/10 to-transparent border border-primary/30 rounded-lg px-4 py-3 backdrop-blur-sm">
            <div className="text-[10px] font-mono text-primary/60 tracking-widest mb-1">{getTechHudText('diagnosticStream', lang)}</div>
            <div className="text-xs font-orbitron text-foreground font-bold">{getTechHudText('active', lang)}</div>
            <div className="flex gap-1 mt-2">
              <motion.span animate={{ opacity: [0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 bg-primary rounded-full" />
              <motion.span animate={{ opacity: [0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
              <motion.span animate={{ opacity: [0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top-right: System status */}
      <motion.div
        className="absolute top-24 right-8 pointer-events-auto"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-lg" />
          <div className="relative bg-gradient-to-b from-accent/10 to-transparent border border-accent/30 rounded-lg px-4 py-3 backdrop-blur-sm">
            <div className="text-[10px] font-mono text-accent/60 tracking-widest mb-1">{getTechHudText('systemStatus', lang)}</div>
            <div className="text-xs font-orbitron text-foreground font-bold">{getTechHudText('optimal', lang)}</div>
            <div className="mt-2 text-[10px] text-accent/70 font-mono">↑ 2.4GB | ↓ 1.8GB</div>
          </div>
        </div>
      </motion.div>

      {/* Bottom-left: Metric display */}
      <motion.div
        className="absolute bottom-32 left-6 pointer-events-auto"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/15 blur-xl rounded-lg" />
          <div className="relative bg-gradient-to-b from-primary/10 to-transparent border border-primary/25 rounded-lg px-3 py-2 backdrop-blur-sm max-w-[120px]">
            <div className="text-[9px] font-mono text-primary/50 tracking-widest mb-1">{getTechHudText('metrics', lang)}</div>
            {metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="text-[10px] text-foreground/70 mb-1 flex justify-between">
                <span>{m.label}</span>
                <span style={{ color: m.color }} className="font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom-right: Live metrics */}
      <motion.div
        className="absolute bottom-40 right-6 pointer-events-auto"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-accent/15 blur-xl rounded-lg" />
          <div className="relative bg-gradient-to-b from-accent/10 to-transparent border border-accent/25 rounded-lg px-3 py-2 backdrop-blur-sm max-w-[140px]">
            <div className="text-[9px] font-mono text-accent/50 tracking-widest mb-1">{getTechHudText('liveMetrics', lang)}</div>
            {metrics.slice(2, 4).map((m, i) => (
              <div key={i} className="text-[10px] text-foreground/70 mb-1 flex justify-between">
                <span>{m.label}</span>
                <span style={{ color: m.color }} className="font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center: Scanning line animation */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </motion.div>

      {/* Corner: Radar sweep */}
      <motion.div
        className="absolute bottom-20 right-20 pointer-events-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, linear: true }}
      >
        <div className="relative w-24 h-24 border border-primary/30 rounded-full">
          <div className="absolute inset-0 border-l-2 border-t-2 border-primary/60 rounded-full" />
          <motion.div
            className="absolute inset-0 border-r-2 border-primary/40 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, linear: true }}
          />
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>

      {/* Floating orbs - enhanced particle effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['hsl(174 100% 54%)', 'hsl(168 90% 42%)', 'hsl(180 100% 90%)'][i],
            left: `${20 + i * 30}%`,
            top: `${40 + i * 15}%`,
            boxShadow: `0 0 10px ${['hsl(174 100% 54% / 0.6)', 'hsl(168 90% 42% / 0.6)', 'hsl(180 100% 90% / 0.6)'][i]}`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.sin(i) * 40, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}