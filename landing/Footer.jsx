import React, { useEffect, useState } from 'react';
import { ShieldCheck, Mail, MapPin, MessageSquare, Calendar } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import AppointmentModal from './AppointmentModal';
import ContactFormModal from './ContactFormModal';

const resourceLinks = ['#catalog', '#efficacy', '#technology', '#additives', '/products'];
const portBakuMapUrl = 'https://www.google.com/maps/search/?api=1&query=Port+Baku,Baku,Azerbaijan';

function WhatsAppIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.02 3C8.84 3 3 8.84 3 16.02c0 2.3.6 4.53 1.75 6.5L3.1 29l6.64-1.6A12.94 12.94 0 0 0 16.02 29C23.2 29 29 23.2 29 16.02 29 8.84 23.2 3 16.02 3Zm0 23.7c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.94.95 1.02-3.83-.27-.43a10.65 10.65 0 0 1-1.41-5.56c0-5.9 4.82-10.72 10.73-10.72 5.9 0 10.68 4.82 10.68 10.72 0 5.91-4.78 10.68-10.68 10.68Zm5.88-8.02c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.52-.16-.74.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.15-.14.32-.38.49-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.27-.64-.54-.55-.74-.56h-.62c-.22 0-.57.08-.86.4-.3.32-1.14 1.12-1.14 2.72 0 1.6 1.17 3.15 1.33 3.36.16.22 2.3 3.52 5.58 4.94.78.33 1.38.53 1.86.68.78.25 1.49.21 2.05.13.63-.09 1.9-.78 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.14-.3-.22-.62-.38Z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm3 17h-2.5v8h-3.3v-8H12v-3h1.2v-2c0-1.1.5-2.8 2.8-2.8h2.4v2.8h-1.7c-.3 0-.5.1-.5.6v1.4h2.2l-.4 3z" />
    </svg>
  );
}

export default function Footer() {
  const { t, lang } = useLang();
  const [dosesCount, setDosesCount] = useState(2847391);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDosesCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="relative border-t border-border/50">
      {/* Live ticker */}
      <div className="border-b border-border/30 py-3 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] tracking-[4px] text-muted-foreground">
            {t.hero.doses}: <span className="text-primary font-bold">{dosesCount.toLocaleString()}</span>
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-b border-border/30 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setContactOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-orbitron text-[11px] tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg,#a66432,#c87a3c,#a66432)',
              border: '1.5px solid rgba(174,100,54,0.5)',
              boxShadow: '0 0 12px rgba(174,100,54,0.3)',
            }}
          >
            <MessageSquare className="w-4 h-4" />
            {t.footer.sendEmail}
          </button>
          <button
            onClick={() => setAppointmentOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-orbitron text-[11px] tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg,#a66432,#c87a3c,#a66432)',
              border: '1.5px solid rgba(174,100,54,0.5)',
              boxShadow: '0 0 12px rgba(174,100,54,0.3)',
            }}
          >
            <Calendar className="w-4 h-4" />
            {t.footer.requestCall}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span className="font-orbitron text-sm font-bold tracking-widest text-foreground">BIO-SHIELD</span>
            </div>
            <p className="font-inter text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t.footer.brandDesc || 'Pioneering the future of livestock health through advanced molecular vaccine technology. Protecting herds, securing livelihoods.'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-orbitron text-[11px] tracking-[3px] text-foreground mb-4">{t.footer.resources}</h4>
            <div className="space-y-3">
              {t.footer.items.map((item, index) => (
                <a key={item} href={resourceLinks[index] || '#contact'} className="block font-inter text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron text-[11px] tracking-[3px] text-foreground mb-4">{t.footer.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <a href="mailto:hello@bioshield.live" className="font-inter hover:text-primary transition-colors">hello@BioShield.live</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <WhatsAppIcon className="w-3.5 h-3.5 text-primary" />
                <a href="https://wa.me/994502121233" target="_blank" rel="noopener noreferrer" className="font-inter hover:text-primary transition-colors">+994 50 212 12 33</a>
              </div>
              <a href={portBakuMapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="font-inter">{t.footer.location || 'Baku, Azerbaijan'}</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589768613051" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <FacebookIcon className="w-3.5 h-3.5 text-primary" />
                <span className="font-inter">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} BIO-SHIELD FRONTIER. {t.footer.copyright || 'BÜTÜN HÜQUQLAR QORUNUR.'}
          </div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground/50">
            {t.footer.certifications || 'GMP SERTİFİKATLI · ISO 9001 · SOYUQ ZƏNCİR UYĞUN'}
          </div>
        </div>
      </div>

      <AppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <ContactFormModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
}