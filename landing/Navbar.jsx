import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ShoppingCart, Search, MapPin } from 'lucide-react';
import { useLang } from '@/lib/i18n';

function WhatsAppIcon({ className = 'w-3 h-3' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.02 3C8.84 3 3 8.84 3 16.02c0 2.3.6 4.53 1.75 6.5L3.1 29l6.64-1.6A12.94 12.94 0 0 0 16.02 29C23.2 29 29 23.2 29 16.02 29 8.84 23.2 3 16.02 3Zm0 23.7c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.94.95 1.02-3.83-.27-.43a10.65 10.65 0 0 1-1.41-5.56c0-5.9 4.82-10.72 10.73-10.72 5.9 0 10.68 4.82 10.68 10.72 0 5.91-4.78 10.68-10.68 10.68Zm5.88-8.02c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.52-.16-.74.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.15-.14.32-.38.49-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.27-.64-.54-.55-.74-.56h-.62c-.22 0-.57.08-.86.4-.3.32-1.14 1.12-1.14 2.72 0 1.6 1.17 3.15 1.33 3.36.16.22 2.3 3.52 5.58 4.94.78.33 1.38.53 1.86.68.78.25 1.49.21 2.05.13.63-.09 1.9-.78 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.14-.3-.22-.62-.38Z" />
    </svg>
  );
}

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
            <div className="hidden xl:flex items-center gap-3 font-mono text-[9px] tracking-widest text-muted-foreground">
              <a href="https://wa.me/994502121233" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                <WhatsAppIcon className="w-3 h-3 text-primary" /> +994 50 212 12 33
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Port+Baku,Baku,Azerbaijan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                <MapPin className="w-3 h-3 text-primary" /> Baku, Azerbaijan
              </a>
            </div>

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