import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function OutlookIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
      <rect width="48" height="48" rx="6" fill="#0078D4"/>
      <path fill="white" d="M24 10c-7.73 0-14 6.27-14 14s6.27 14 14 14 14-6.27 14-14-6.27-14-14-14zm0 24c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z"/>
      <circle cx="24" cy="24" r="6" fill="white"/>
    </svg>
  );
}

function ZohoIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
      <rect width="48" height="48" rx="6" fill="#E42527"/>
      <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Z</text>
    </svg>
  );
}

const LABELS = {
  EN: { title: 'SYNC WITH CALENDAR', subtitle: 'Add BioShield meeting link to your calendar', google: 'Google Calendar', outlook: 'Outlook Calendar', zoho: 'Zoho Calendar' },
  AZ: { title: 'TAQVİMLƏ SİNXRONİZASİYA', subtitle: 'BioShield görüş linkini taqviminizə əlavə edin', google: 'Google Təqvim', outlook: 'Outlook Təqvim', zoho: 'Zoho Təqvim' },
  RU: { title: 'СИНХРОНИЗАЦИЯ С КАЛЕНДАРЁМ', subtitle: 'Добавьте ссылку на встречу BioShield в ваш календарь', google: 'Google Календарь', outlook: 'Outlook Календарь', zoho: 'Zoho Календарь' },
};

// Build calendar URLs
const EVENT_TITLE = encodeURIComponent('BioShield Consultation');
const EVENT_DETAILS = encodeURIComponent('Consultation with BioShield team. Contact: hello@BioShield.live');
const EVENT_LOCATION = encodeURIComponent('Baku, Azerbaijan');
const now = new Date();
const start = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const end = new Date(start.getTime() + 60 * 60 * 1000);
const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace('.000', '');

const GOOGLE_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${EVENT_TITLE}&details=${EVENT_DETAILS}&location=${EVENT_LOCATION}&dates=${fmt(start)}/${fmt(end)}`;
const OUTLOOK_URL = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${EVENT_TITLE}&body=${EVENT_DETAILS}&location=${EVENT_LOCATION}&startdt=${start.toISOString()}&enddt=${end.toISOString()}`;
const ZOHO_URL = `https://calendar.zoho.com/`;

export default function CalendarSyncModal({ open, onClose, lang = 'AZ' }) {
  const L = LABELS[lang] || LABELS.AZ;

  const options = [
    { label: L.google, url: GOOGLE_URL, Icon: GoogleIcon, bg: 'rgba(234,67,53,0.12)', border: 'rgba(234,67,53,0.3)' },
    { label: L.outlook, url: OUTLOOK_URL, Icon: OutlookIcon, bg: 'rgba(0,120,212,0.12)', border: 'rgba(0,120,212,0.3)' },
    { label: L.zoho, url: ZOHO_URL, Icon: ZohoIcon, bg: 'rgba(228,37,39,0.12)', border: 'rgba(228,37,39,0.3)' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(2,12,4,0.85)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(8,28,12,0.97) 0%, rgba(5,18,8,0.99) 100%)',
              border: '1px solid rgba(174,100,54,0.3)',
              boxShadow: '0 0 60px rgba(174,100,54,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid rgba(174,100,54,0.18)', background: 'rgba(174,100,54,0.05)' }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: 'rgba(174,100,54,0.7)' }} />
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">{L.title}</div>
                  <div className="font-mono text-[9px] mt-0.5 text-white/40">{L.subtitle}</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Options */}
            <div className="p-5 space-y-3">
              {options.map(({ label, url, Icon, bg, border }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  {<Icon />}
                  <span className="font-orbitron text-[11px] tracking-widest text-white font-bold flex-1">{label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}