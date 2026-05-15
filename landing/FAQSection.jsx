import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Thermometer, Syringe, HelpCircle, Loader2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <span className="font-inter text-sm text-foreground group-hover:text-primary transition-colors leading-relaxed">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-primary flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-5 border-t border-primary/10">
              <p className="font-inter text-sm text-muted-foreground leading-relaxed pt-4">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const LABELS = {
  EN: {
    tag: 'FAQ',
    title: 'Frequently Asked Questions',
    subtitle: 'Answers pulled live from our vaccine database.',
    storageTitle: 'Storage Temperatures',
    dosageTitle: 'Dosage Requirements',
    storageQ: (name) => `What is the storage temperature for ${name}?`,
    storageA: (name, temp) => `${name} must be stored at ${temp} to maintain potency and efficacy.`,
    dosageQ: (name) => `What is the recommended dosage for ${name}?`,
    dosageA: (name, dosage, species) => `The recommended dosage for ${name} (for ${species}) is: ${dosage}.`,
  },
  AZ: {
    tag: 'TSS',
    title: 'Tez-tez Soruşulan Suallar',
    subtitle: 'Cavablar peyvənd verilənlər bazasından canlı çəkilir.',
    storageTitle: 'Saxlama Temperaturları',
    dosageTitle: 'Dozaj Tələbləri',
    storageQ: (name) => `${name} üçün saxlama temperaturu nədir?`,
    storageA: (name, temp) => `${name} effektivliyini qorumaq üçün ${temp} temperaturda saxlanılmalıdır.`,
    dosageQ: (name) => `${name} üçün tövsiyə olunan dozaj nədir?`,
    dosageA: (name, dosage, species) => `${name} (${species} üçün) üçün tövsiyə olunan dozaj: ${dosage}.`,
  },
  RU: {
    tag: 'ЧЗВ',
    title: 'Часто задаваемые вопросы',
    subtitle: 'Ответы загружаются из базы данных вакцин.',
    storageTitle: 'Температуры хранения',
    dosageTitle: 'Требования к дозировке',
    storageQ: (name) => `Какова температура хранения для ${name}?`,
    storageA: (name, temp) => `${name} необходимо хранить при ${temp} для сохранения эффективности.`,
    dosageQ: (name) => `Какова рекомендуемая дозировка для ${name}?`,
    dosageA: (name, dosage, species) => `Рекомендуемая дозировка для ${name} (для ${species}): ${dosage}.`,
  },
};

export default function FAQSection() {
  const { lang } = useLang();
  const L = LABELS[lang] || LABELS.EN;

  const { data: vaccines = [], isLoading } = useQuery({
    queryKey: ['vaccines-faq'],
    queryFn: () => base44.entities.Vaccine.list(),
  });

  const storageItems = useMemo(() =>
    vaccines
      .filter(v => v.storage_temp)
      .map((v, i) => ({
        question: L.storageQ(v.name),
        answer: L.storageA(v.name, v.storage_temp),
        index: i,
      })),
    [vaccines, lang]
  );

  const dosageItems = useMemo(() =>
    vaccines
      .filter(v => v.dosage)
      .map((v, i) => ({
        question: L.dosageQ(v.name),
        answer: L.dosageA(v.name, v.dosage, v.species),
        index: i,
      })),
    [vaccines, lang]
  );

  return (
    <section id="faq" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">{L.tag}</div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {L.title}
          </h2>
          <p className="font-inter text-muted-foreground mt-4 max-w-xl leading-relaxed">{L.subtitle}</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Storage */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-orbitron text-sm font-bold tracking-widest text-primary">{L.storageTitle}</h3>
              </div>
              <div className="space-y-3">
                {storageItems.map((item, i) => (
                  <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
                ))}
              </div>
            </div>

            {/* Dosage */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Syringe className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-orbitron text-sm font-bold tracking-widest text-primary">{L.dosageTitle}</h3>
              </div>
              <div className="space-y-3">
                {dosageItems.map((item, i) => (
                  <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}