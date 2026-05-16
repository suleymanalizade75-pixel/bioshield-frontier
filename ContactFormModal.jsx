import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

export default function ContactFormModal({ open, onClose }) {
  const { t, lang } = useLang();
  const c = t.contact;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = c.errors.nameRequired;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = c.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = c.errors.emailInvalid;
    }

    // Validate subject
    if (!formData.subject.trim()) {
      errors.subject = c.errors.subjectRequired;
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = c.errors.messageRequired;
    } else if (formData.message.length > 5000) {
      errors.message = c.errors.messageTooLong;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field) => {
    return (e) => {
      setFormData({ ...formData, [field]: e.target.value });
      // Clear error for this field when user starts typing
      if (validationErrors[field]) {
        setValidationErrors({ ...validationErrors, [field]: '' });
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        setValidationErrors({});
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
                    {/* Name Field */}
                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.name}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm transition-colors ${
                          validationErrors.name ? 'border-red-500 bg-red-50/10' : ''
                        }`}
                        style={{
                          background: validationErrors.name ? 'rgba(239, 68, 68, 0.05)' : '#ffffff',
                          color: '#111111',
                          borderColor: validationErrors.name ? '#ef4444' : 'rgba(0,0,0,0.15)',
                        }}
                        placeholder={c.name}
                      />
                      {validationErrors.name && (
                        <div className="text-red-400 text-[9px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.name}
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.email}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm transition-colors ${
                          validationErrors.email ? 'border-red-500' : ''
                        }`}
                        style={{
                          background: validationErrors.email ? 'rgba(239, 68, 68, 0.05)' : '#ffffff',
                          color: '#111111',
                          borderColor: validationErrors.email ? '#ef4444' : 'rgba(0,0,0,0.15)',
                        }}
                        placeholder="your@email.com"
                      />
                      {validationErrors.email && (
                        <div className="text-red-400 text-[9px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.email}
                        </div>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.subject}</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange('subject')}
                        className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm transition-colors ${
                          validationErrors.subject ? 'border-red-500' : ''
                        }`}
                        style={{
                          background: validationErrors.subject ? 'rgba(239, 68, 68, 0.05)' : '#ffffff',
                          color: '#111111',
                          borderColor: validationErrors.subject ? '#ef4444' : 'rgba(0,0,0,0.15)',
                        }}
                        placeholder={c.subject}
                      />
                      {validationErrors.subject && (
                        <div className="text-red-400 text-[9px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.subject}
                        </div>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{c.message}</label>
                      <textarea
                        value={formData.message}
                        onChange={handleInputChange('message')}
                        rows={8}
                        maxLength={5000}
                        className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm resize-none transition-colors ${
                          validationErrors.message ? 'border-red-500' : ''
                        }`}
                        style={{
                          background: validationErrors.message ? 'rgba(239, 68, 68, 0.05)' : '#ffffff',
                          color: '#111111',
                          borderColor: validationErrors.message ? '#ef4444' : 'rgba(0,0,0,0.15)',
                        }}
                        placeholder={c.messagePlaceholder}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <div>
                          {validationErrors.message && (
                            <div className="text-red-400 text-[9px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {validationErrors.message}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-[9px] text-white/50">
                          {formData.message.length}/5000
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
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
