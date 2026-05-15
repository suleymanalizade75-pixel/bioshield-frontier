import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

export default function AppointmentModal({ open, onClose }) {
  const { t, lang } = useLang();
  const ap = t.appointment;
  const [step, setStep] = useState(1); // 1: date, 2: time, 3: details
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('30 min');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Time slots: 09:00 AM - 06:00 PM (merged morning/afternoon)
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if date is available: not a weekend and not in the past
  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false; // Past date
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // Not Saturday (6) or Sunday (0)
  };

  // Convert time string to 24-hour format (e.g., "09:00 AM" -> 9)
  const parseHourFromSlot = (slot) => {
    const parts = slot.split(/[: ]/);
    let hour = parseInt(parts[0]);
    if (slot.includes('PM') && hour !== 12) hour += 12;
    if (slot.includes('AM') && hour === 12) hour = 0;
    return hour;
  };

  // Check if time slot has already passed for today
  const isTimeSlotAvailable = (slot) => {
    if (!selectedDate) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDay = new Date(selectedDate);
    selectedDay.setHours(0, 0, 0, 0);

    // If selected date is in the future, all slots are available
    if (selectedDay > today) return true;

    // If selected date is today, check if time has passed
    if (selectedDay.getTime() === today.getTime()) {
      const currentHour = new Date().getHours();
      const slotHour = parseHourFromSlot(slot);
      return slotHour > currentHour; // Slot is available if it's later than current hour
    }

    return true;
  };

  const durations = ['15 min', '30 min', '45 min', '60 min'];

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await base44.functions.invoke('appointmentWorkflow', {
        action: 'request',
        date: selectedDate?.toISOString(),
        time: selectedTime,
        duration: selectedDuration,
        clientName,
        clientEmail,
        lang,
      });
      setSuccess(true);
      setTimeout(() => {
        setStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedDuration('30 min');
        setClientName('');
        setClientEmail('');
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to send appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedDuration('30 min');
    setClientName('');
    setClientEmail('');
    setSuccess(false);
    onClose();
  };

  const days = Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1));
  const firstDay = getFirstDayOfMonth(currentMonth);
  const emptyDays = Array(firstDay).fill(null);

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
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(8,28,12,0.95) 0%, rgba(5,18,8,0.98) 100%)',
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
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: 'rgba(174,100,54,0.7)' }} />
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">
                    {ap.title}
                  </div>
                  <div className="font-mono text-[8px] tracking-[2px] mt-0.5" style={{ color: 'rgba(174,100,54,0.55)' }}>
                    {ap.step} {step} {ap.of} 3
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
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
                  <>
                    {step === 1 && (
                      <motion.div key="date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4 text-white/70" />
                          </button>
                          <div className="font-orbitron text-sm font-bold text-white text-center flex-1">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </div>
                          <button
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-white/70" />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-6">
                          {ap.days.map(d => (
                            <div key={d} className="text-center font-mono text-[10px] text-white/50 py-2">
                              {d}
                            </div>
                          ))}
                          {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                          {days.map((date) => {
                            const available = isDateAvailable(date);
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            return (
                              <motion.button
                                key={date.getDate()}
                                whileHover={available ? { scale: 1.08 } : {}}
                                onClick={() => available && setSelectedDate(date)}
                                disabled={!available}
                                className={`py-2 rounded text-center font-orbitron text-[10px] font-bold transition-all ${
                                  isSelected
                                    ? 'bg-amber-600 text-white'
                                    : available
                                    ? 'hover:bg-white/10 text-white/80'
                                    : 'text-white/30 cursor-not-allowed'
                                }`}
                              >
                                {date.getDate()}
                              </motion.button>
                            );
                          })}
                        </div>

                        <button
                           onClick={() => selectedDate && setStep(2)}
                           disabled={!selectedDate}
                           className="w-full py-2.5 rounded-lg font-orbitron text-[10px] tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                           style={{
                             background: selectedDate ? 'linear-gradient(135deg,#a66432,#c87a3c,#a66432)' : 'rgba(174,100,54,0.2)',
                             border: '1.5px solid rgba(174,100,54,0.3)',
                           }}
                         >
                           {ap.nextTime}
                         </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="time" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(174,100,54,0.08)', border: '1px solid rgba(174,100,54,0.2)' }}>
                          <div className="font-mono text-[9px] tracking-[2px] text-white/70">{ap.selectedDate}</div>
                          <div className="font-orbitron text-sm font-bold text-white mt-1">
                            {selectedDate?.toDateString()}
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="font-mono text-[10px] tracking-[3px] text-white/70 mb-3">{ap.availableTimes}</div>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot) => {
                              const isAvailable = isTimeSlotAvailable(slot);
                              return (
                                <motion.button
                                  key={slot}
                                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                                  onClick={() => isAvailable && setSelectedTime(slot)}
                                  disabled={!isAvailable}
                                  className={`py-2 px-3 rounded-lg font-orbitron text-[10px] font-bold transition-all ${
                                    selectedTime === slot && isAvailable
                                      ? 'bg-amber-600 text-white'
                                      : isAvailable
                                      ? 'bg-white/8 border border-white/15 text-white/80 hover:bg-white/12 cursor-pointer'
                                      : 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                                  }`}
                                >
                                  {slot}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-2.5 rounded-lg border border-white/15 text-white font-orbitron text-[10px] tracking-widest hover:bg-white/5 transition-all"
                          >
                            {ap.back}
                          </button>
                          <button
                            onClick={() => selectedTime && setStep(3)}
                            disabled={!selectedTime}
                            className="flex-1 py-2.5 rounded-lg font-orbitron text-[10px] tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              background: selectedTime ? 'linear-gradient(135deg,#a66432,#c87a3c,#a66432)' : 'rgba(174,100,54,0.2)',
                              border: '1.5px solid rgba(174,100,54,0.3)',
                            }}
                          >
                            {ap.confirm}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="space-y-4 mb-6">
                          <div className="p-3 rounded-lg" style={{ background: 'rgba(174,100,54,0.08)', border: '1px solid rgba(174,100,54,0.2)' }}>
                            <div className="flex items-center gap-2 text-white">
                              <Calendar className="w-4 h-4" style={{ color: 'rgba(174,100,54,0.7)' }} />
                              <div>
                                <div className="font-mono text-[9px] text-white/70">{ap.selectedDate}</div>
                                <div className="font-orbitron text-sm font-bold">{selectedDate?.toDateString()}</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 rounded-lg" style={{ background: 'rgba(174,100,54,0.08)', border: '1px solid rgba(174,100,54,0.2)' }}>
                            <div className="flex items-center gap-2 text-white">
                              <Clock className="w-4 h-4" style={{ color: 'rgba(174,100,54,0.7)' }} />
                              <div>
                                <div className="font-mono text-[9px] text-white/70">{ap.availableTimes}</div>
                                <div className="font-orbitron text-sm font-bold">{selectedTime}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{lang === 'EN' ? 'YOUR NAME' : lang === 'AZ' ? 'SIZIN ADNIZ' : 'ВАШЕ ИМЯ'}</label>
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm"
                            style={{ background: '#ffffff', color: '#111111', borderColor: 'rgba(255,255,255,0.2)' }}
                            placeholder="Full name"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{lang === 'EN' ? 'EMAIL' : lang === 'AZ' ? 'E-POÇT' : 'ЭЛЕКТРОННАЯ ПОЧТА'}</label>
                          <input
                            type="email"
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm"
                            style={{ background: '#ffffff', color: '#111111', borderColor: 'rgba(255,255,255,0.2)' }}
                            placeholder="your@email.com"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{lang === 'EN' ? 'DURATION' : lang === 'AZ' ? 'MÜDDƏT' : 'ПРОДОЛЖИТЕЛЬНОСТЬ'}</label>
                          <div className="grid grid-cols-4 gap-2">
                            {durations.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDuration(d)}
                                className={`py-2 rounded-lg font-orbitron text-[9px] font-bold transition-all ${
                                  selectedDuration === d
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-white/8 border border-white/15 text-white/80 hover:bg-white/12'
                                }`}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className="font-inter text-sm text-white/70 mb-6 text-center">
                          {ap.confirmNote}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setStep(2)}
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg border border-white/15 text-white font-orbitron text-[10px] tracking-widest hover:bg-white/5 transition-all disabled:opacity-50"
                            >
                            {ap.back}
                            </button>
                            <button
                            onClick={handleConfirm}
                            disabled={loading || !clientEmail || !clientName}
                            className="flex-1 py-2.5 rounded-lg font-orbitron text-[10px] tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              background: 'linear-gradient(135deg,#a66432,#c87a3c,#a66432)',
                              border: '1.5px solid rgba(174,100,54,0.5)',
                              boxShadow: '0 0 14px rgba(174,100,54,0.4)',
                            }}
                          >
                            {loading ? ap.booking : ap.confirm}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.4))' }} />
                    <div className="font-orbitron text-lg font-bold text-white mb-2">
                      {ap.successTitle}
                    </div>
                    <p className="font-inter text-sm text-white/70">
                      {ap.successDesc}
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