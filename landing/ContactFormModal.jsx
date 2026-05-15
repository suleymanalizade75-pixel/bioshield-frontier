import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

export default function ContactFormModal({ open, onClose }) {
  const { t, lang } = useLang();
  const c = t.contact;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await base44.functions.invoke('contactFormSubmit', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        lang,
      });
      setSuccess(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(2,12,4,0.80)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(31,41,55,0.98) 0%, rgba(17,24,39,0.98) 100%)',
              border: '1px solid rgba(174,100,54,0.3)',
              boxShadow: '0 0 60px rgba(174,100,54,0.12), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(174,100,54,0.18)',
                background: 'rgba(174,100,54,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                  {c.title}
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(174,100,54,0.55)' }}>
                  {c.subtitle} · +994 50 212 12 33 · Baku, Azerbaijan
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.name}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm"
                        style={{ background: '#ffffff', color: '#111111', borderColor: 'rgba(0,0,0,0.15)' }}
                        placeholder={c.name}
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.email}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm"
                        style={{ background: '#ffffff', color: '#111111', borderColor: 'rgba(0,0,0,0.15)' }}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.subject}</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm"
                        style={{ background: '#ffffff', color: '#111111', borderColor: 'rgba(0,0,0,0.15)' }}
                        placeholder={c.subject}
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.message}</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 5000) })}
                        rows={8}
                        maxLength={5000}
                        className="w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm resize-none"
                        style={{ background: '#ffffff', color: '#111111', borderColor: 'rgba(0,0,0,0.15)' }}
                        placeholder={c.messagePlaceholder}
                      />
                      <div className="mt-1 text-right text-[9px] text-white/50">
                        {formData.message.length}/5000 characters
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-white/15 text-white font-orbitron text-[10px] tracking-widest hover:bg-white/5 transition-all duration-200"
                      >
                        {c.cancel}
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 rounded-lg font-orbitron text-[10px] tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg,#a66432,#c87a3c,#a66432)',
                          border: '1.5px solid rgba(174,100,54,0.5)',
                          boxShadow: '0 0 14px rgba(174,100,54,0.4)',
                        }}
                      >
                        <Send className="w-3.5 h-3.5" />
                        {loading ? c.sending : c.send}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.4))' }} />
                    <div className="font-orbitron text-xl font-bold text-white mb-2">
                      {c.successTitle}
                    </div>
                    <p className="font-inter text-sm text-white/70">
                      {c.successDesc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}