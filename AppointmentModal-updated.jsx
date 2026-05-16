import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

// Azerbaijani public holidays (Month-Day format)
const AZERBAIJAN_PUBLIC_HOLIDAYS = [
  '01-01', // New Year
  '03-08', // International Women's Day
  '03-20', // Novruz
  '03-21', // Novruz
  '03-22', // Novruz
  '03-23', // Novruz
  '03-24', // Novruz
  '05-09', // Victory Day
  '05-28', // Republic Day
  '06-15', // National Salvation Day
  '06-26', // Armed Forces Day
  '10-18', // Independence Day
  '11-17', // National Flag Day
  '12-31', // World Azerbaijanis Solidarity Day
];

function isPublicHoliday(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return AZERBAIJAN_PUBLIC_HOLIDAYS.includes(`${month}-${day}`);
}

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
  const [validationErrors, setValidationErrors] = useState({});

  // Baku business hours: 09:00-13:00 and 15:00-18:00
  const BAKU_BUSINESS_HOURS = [
    { start: 9, end: 13 },   // Morning: 09:00-13:00
    { start: 15, end: 18 }   // Afternoon: 15:00-18:00
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Convert time string to 24-hour format (e.g., "09:00 AM" -> 9)
  const parseHourFromSlot = (slot) => {
    const parts = slot.split(/[: ]/);
    let hour = parseInt(parts[0]);
    if (slot.includes('PM') && hour !== 12) hour += 12;
    if (slot.includes('AM') && hour === 12) hour = 0;
    return hour;
  };

  // Check if time is within Baku business hours
  const isTimeWithinBusinessHours = (hour) => {
    return BAKU_BUSINESS_HOURS.some(period => hour >= period.start && hour < period.end);
  };

  // Check if date is available: not a weekend, not in the past, not a public holiday
  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if past date
    if (date < today) return false;
    
    // Check if weekend (Saturday = 6, Sunday = 0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    
    // Check if public holiday
    if (isPublicHoliday(date)) return false;
    
    return true;
  };

  // Check if time slot has already passed for today and is within business hours
  const isTimeSlotAvailable = (slot) => {
    if (!selectedDate) return true;
    
    const slotHour = parseHourFromSlot(slot);
    
    // Check if within business hours
    if (!isTimeWithinBusinessHours(slotHour)) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDay = new Date(selectedDate);
    selectedDay.setHours(0, 0, 0, 0);

    // If selected date is in the future, all business hour slots are available
    if (selectedDay > today) return true;

    // If selected date is today, check if time has passed
    if (selectedDay.getTime() === today.getTime()) {
      const currentHour = new Date().getHours();
      return slotHour > currentHour; // Slot is available if it's later than current hour
    }

    return true;
  };

  const durations = ['15 min', '30 min', '45 min', '60 min'];

  const validateStep3 = () => {
    const errors = {};
    
    if (!clientName.trim()) {
      errors.name = ap.errors.nameRequired;
    }
    
    if (!clientEmail.trim()) {
      errors.email = ap.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      errors.email = ap.errors.emailInvalid;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validateStep3()) return;
    
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
        setValidationErrors({});
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to send appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const days = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
    days.push(date);
  }

  const emptyDays = Array(42 - days.length).fill(null);

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
                  {ap.title}
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(174,100,54,0.55)' }}>
                  {ap.timezone} · {ap.businessHours}
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
                  <>
                    {step === 1 && (
                      <motion.div key="date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="mb-4">
                          <div className="font-mono text-[10px] tracking-[3px] text-white/70 mb-4 flex items-center justify-between">
                            <span>{ap.selectedDate}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-1 hover:bg-white/10 rounded transition-all"
                              >
                                <ChevronLeft className="w-4 h-4" style={{ color: 'rgba(174,100,54,0.6)' }} />
                              </button>
                              <span className="font-orbitron text-xs" style={{ color: 'rgba(174,100,54,0.8)' }}>
                                {currentMonth.toLocaleDateString(lang === 'EN' ? 'en-US' : lang === 'AZ' ? 'az-AZ' : 'ru-RU', { month: 'long', year: 'numeric' })}
                              </span>
                              <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-1 hover:bg-white/10 rounded transition-all"
                              >
                                <ChevronRight className="w-4 h-4" style={{ color: 'rgba(174,100,54,0.6)' }} />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-6">
                          {ap.days.map(d => (
                            <div key={d} className="text-center font-mono text-[10px] text-white/50 py-2">
                              {d}
                            </div>
                          ))}
                          {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                          {days.map((date) => {
                            const available = date && isDateAvailable(date);
                            const isSelected = date && selectedDate?.toDateString() === date.toDateString();
                            const isHoliday = date && isPublicHoliday(date);
                            
                            return (
                              <motion.button
                                key={date ? date.getDate() : `empty-${Math.random()}`}
                                whileHover={available ? { scale: 1.08 } : {}}
                                onClick={() => date && available && setSelectedDate(date)}
                                disabled={!available}
                                className={`py-2 rounded text-center font-orbitron text-[10px] font-bold transition-all ${
                                  isSelected
                                    ? 'bg-amber-600 text-white'
                                    : available
                                    ? 'hover:bg-white/10 text-white/80 cursor-pointer'
                                    : 'text-white/30 cursor-not-allowed'
                                }`}
                                title={isHoliday ? ap.errors.publicHoliday : undefined}
                              >
                                {date ? date.getDate() : ''}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Info box */}
                        <div className="mb-4 p-3 rounded-lg flex gap-2" style={{ background: 'rgba(174,100,54,0.08)', border: '1px solid rgba(174,100,54,0.2)' }}>
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(174,100,54,0.6)' }} />
                          <div className="font-mono text-[9px] text-white/70">
                            {lang === 'EN' 
                              ? 'Weekends and public holidays are not available'
                              : lang === 'AZ'
                              ? 'Həftəsonu günləri və dövlət bayramları mövcud deyil'
                              : 'Выходные и праздничные дни недоступны'}
                          </div>
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
                              const slotHour = parseHourFromSlot(slot);
                              const withinHours = isTimeWithinBusinessHours(slotHour);
                              
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
                                  title={!withinHours ? ap.errors.outsideBusinessHours : undefined}
                                >
                                  {slot}
                                </motion.button>
                              );
                            })}
                          </div>
                          <div className="mt-3 p-2 rounded text-[9px] text-white/60 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            {lang === 'EN'
                              ? 'Available hours: 09:00-13:00 & 15:00-18:00 (Baku Time)'
                              : lang === 'AZ'
                              ? 'Mövcud saatlar: 09:00-13:00 & 15:00-18:00 (Bakı Vaxtı)'
                              : 'Доступные часы: 09:00-13:00 & 15:00-18:00 (время Баку)'}
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
                          <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{ap.yourName}</label>
                          <input
                            type="text"
                            value={clientName}
                            onChange={(e) => {
                              setClientName(e.target.value);
                              if (validationErrors.name) {
                                setValidationErrors({ ...validationErrors, name: '' });
                              }
                            }}
                            className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm ${validationErrors.name ? 'border-red-500' : ''}`}
                            style={{ background: '#ffffff', color: '#111111', borderColor: validationErrors.name ? undefined : 'rgba(255,255,255,0.2)' }}
                            placeholder={ap.yourName}
                          />
                          {validationErrors.name && (
                            <div className="text-red-400 text-[9px] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {validationErrors.name}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{ap.email}</label>
                          <input
                            type="email"
                            value={clientEmail}
                            onChange={(e) => {
                              setClientEmail(e.target.value);
                              if (validationErrors.email) {
                                setValidationErrors({ ...validationErrors, email: '' });
                              }
                            }}
                            className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none font-inter text-sm ${validationErrors.email ? 'border-red-500' : ''}`}
                            style={{ background: '#ffffff', color: '#111111', borderColor: validationErrors.email ? undefined : 'rgba(255,255,255,0.2)' }}
                            placeholder="your@email.com"
                          />
                          {validationErrors.email && (
                            <div className="text-red-400 text-[9px] mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {validationErrors.email}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="font-mono text-[10px] tracking-[3px] text-white/70 mb-2 block">{ap.duration}</label>
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
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg font-orbitron text-[10px] tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
