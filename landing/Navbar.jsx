import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ShoppingCart, Search } from 'lucide-react';
import { useLang } from '@/lib/i18n';


export default function Navbar({ cartCount = 0, onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.portfolio,  href: '#catalog' },
    { label: t.nav.efficacy,   href: '#efficacy' },
    { label: t.nav.technology, href: '#technology' },
    { label: t.nav.additives,  href: '#additives' },
    { label: t.nav.contact,    href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_hsl(174_100%_54%/0.05)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-primary" style={{ filter: 'drop-shadow(0 0 6px hsl(174 100% 54% / 0.7))' }} />
            <span className="font-orbitron text-sm font-bold tracking-widest text-foreground">
              BIO-SHIELD
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-orbitron text-[11px] tracking-[3px] text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Search button */}
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 group"
              style={{
                background: 'rgba(52,211,153,0.07)',
                border: '1px solid rgba(52,211,153,0.2)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(52,211,153,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(52,211,153,0.07)'}
            >
              <Search className="w-3.5 h-3.5" style={{ color: 'rgba(52,211,153,0.7)' }} />
              <span className="hidden sm:inline font-mono text-[9px] tracking-[3px]" style={{ color: 'rgba(52,211,153,0.6)' }}>{t.search || 'AXTAR'}</span>
            </button>

            {/* Language switcher */}
            <div className="flex items-center gap-0.5 bg-card/80 border border-primary/20 rounded-lg overflow-hidden px-1 py-1"
              style={{ backdropFilter: 'blur(10px)' }}>
              {['EN', 'AZ', 'RU'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-orbitron text-[9px] tracking-widest px-2.5 py-1 rounded-md transition-all duration-200 ${
                    lang === l
                      ? 'bg-primary text-primary-foreground shadow-[0_0_8px_hsl(174_100%_54%/0.5)]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link 
              to="/products"
              className="px-4 py-1.5 rounded-lg font-orbitron text-[10px] tracking-widest font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              {lang === 'AZ' ? 'BAYTARLIQLIQ KATALOQU' : lang === 'RU' ? 'ВЕТЕРИНАРНЫЙ КАТАЛОГ' : 'VETERINARY CATALOG'}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{ boxShadow: '0 0 8px hsl(174 100% 54% / 0.8)' }}>
                  {cartCount}
                </span>
              )}
            </Link>

            <button onClick={() => setMenuOpen(true)} className="md:hidden text-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] glass flex flex-col items-center justify-center"
            style={{ backdropFilter: 'blur(30px)' }}
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-orbitron text-2xl tracking-[6px] text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link 
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-2.5 rounded-lg font-orbitron text-xl tracking-[6px] font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all"
                >
                  Baytarlıq Kataloqu
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}