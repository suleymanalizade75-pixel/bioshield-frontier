import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, FlaskConical, ShieldCheck, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import { getProductName, getCategoryLabel } from '@/lib/productCatalogI18n';

// Map species option strings → database species names
const SPECIES_MAP = {
  'Bovine (Cattle)': 'Bovine', 'Qaramal': 'Bovine', 'Крупный рогатый скот': 'Bovine',
  'Porcine (Pig)': 'Porcine', 'Donuz': 'Porcine', 'Свинья': 'Porcine',
  'Ovine (Sheep)': 'Ovine', 'Qoyun': 'Ovine', 'Овца': 'Ovine',
  'Poultry': 'Poultry', 'Quşçuluq': 'Poultry', 'Птица': 'Poultry',
  'Equine (Horse)': 'Equine', 'At': 'Equine', 'Лошадь': 'Equine',
  'Caprine (Goat)': 'Caprine', 'Keçi': 'Caprine', 'Коза': 'Caprine',
};

// i18n labels
const UI_TEXT = {
  EN: {
    productLine: 'PRODUCT LINE', xvet: 'VETERINARY CATALOG', immucell: 'ImmuCell',
    immucellNote: '⚠️ CRITICAL: ImmuCell is EXCLUSIVELY for newborn calves within 12 hours of birth. One dose (1 syringe) per calf. Not applicable to other species or older animals.',
    waterLabel: 'WATER VOLUME (L)',
    waterPlaceholder: 'e.g. 5000',
    feedLabel: 'FEED WEIGHT (KG)',
    feedPlaceholder: 'e.g. 1000',
    animalLabel: 'ANIMAL COUNT',
    animalPlaceholder: 'e.g. 20',
    resultHeader: 'DOSING PROTOCOL',
    immucellHeader: 'IMMUCELL LABEL DOSE',
    calcLabel: 'Calculation',
    totalLabel: 'Total Dose',
    routeLabel: 'Route of Administration',
    freqLabel: 'Treatment Duration',
    noteLabel: 'Note',
    noProducts: 'No products found for this species combination.',
    fixedNote: 'Fixed dose per animal per day.',
    loading: 'Loading product database...',
  },
  AZ: {
    productLine: 'MƏHSUL XƏTTİ', xvet: 'BAYTARLIQLIQ KATALOQU', immucell: 'ImmuCell',
    immucellNote: 'ImmuCell məhsulları YENİDÖĞÜŞ BUZNUQ ÜÇÜN xüsusi hazırlanıbdır. Bir doza/şringə — ilk 12 saat ərzində tətbiq edilir. Başqa heyvan növləri üçün uyğun deyil.',
    waterLabel: 'SU HƏCMİ (L)',
    waterPlaceholder: 'məs. 5000',
    feedLabel: 'YEM ÇƏKİSİ (KQ)',
    feedPlaceholder: 'məs. 1000',
    animalLabel: 'HEYVAN SAYI',
    animalPlaceholder: 'məs. 20',
    resultHeader: 'DOZALAMA PROTOKOLU',
    immucellHeader: 'IMMUCELL ETİKET DOZASI',
    calcLabel: 'Hesablama',
    totalLabel: 'Ümumi Doza',
    routeLabel: 'İstifadə Yolu',
    freqLabel: 'Müalicə Müddəti',
    noteLabel: 'Qeyd',
    noProducts: 'Bu növ üçün məhsul tapılmadı.',
    fixedNote: 'Hər heyvan üçün gündəlik sabit doza.',
    loading: 'Məhsul verilənləri bazası yüklənir...',
  },
  RU: {
    productLine: 'ЛИНЕЙКА ПРОДУКТОВ', xvet: 'ВЕТЕРИНАРНЫЙ КАТАЛОГ', immucell: 'ImmuCell',
    immucellNote: '⚠️ КРИТИЧНО: ImmuCell предназначен ИСКЛЮЧИТЕЛЬНО для новорождённых телят в первые 12 часов жизни. Одна доза (1 шприц) на телёнка. Не применяется для других видов и взрослых животных.',
    waterLabel: 'ОБЪЁМ ВОДЫ (Л)',
    waterPlaceholder: 'напр. 5000',
    feedLabel: 'ВЕС КОРМА (КГ)',
    feedPlaceholder: 'напр. 1000',
    animalLabel: 'КОЛ-ВО ЖИВОТНЫХ',
    animalPlaceholder: 'напр. 20',
    resultHeader: 'ПРОТОКОЛ ДОЗИРОВАНИЯ',
    immucellHeader: 'ДОЗА IMMUCELL ПО ЭТИКЕТКЕ',
    calcLabel: 'Расчёт',
    totalLabel: 'Итоговая доза',
    routeLabel: 'Способ применения',
    freqLabel: 'Продолжительность лечения',
    noteLabel: 'Примечание',
    noProducts: 'Продукты для данного вида не найдены.',
    fixedNote: 'Фиксированная доза на животное в сутки.',
    loading: 'Загрузка базы данных продуктов...',
  },
};

// Calculate dosages from database products
function calculateDosesFromProducts(products, speciesFilter, waterL, feedKg, animalCount, lang) {
  const filtered = products.filter(p => {
    const speciesMatch = !speciesFilter || p.species?.includes(speciesFilter);
    return speciesMatch && p.dosage && p.dosage_unit;
  });

  return filtered.map(p => {
  let totalDose = null;
  let calcStr = '';

  const dosageUnit = p.dosage_unit || '';
  const bodyWeight = 500;
  const dosageNum = parseFloat(p.dosage);
  const animalLabel = lang === 'EN' ? 'animals' : lang === 'AZ' ? 'heyvan' : 'животные';
  const doseLabel = lang === 'EN' ? 'dose/animal' : lang === 'AZ' ? 'doza/heyvan' : 'доза/животное';

  if (dosageUnit === 'ml/L water' && waterL) {
    const w = parseFloat(waterL);
    const perLiter = dosageNum || 100;
    totalDose = (w / 1000) * perLiter * 1000;
    calcStr = `${w} L × (${perLiter} ml ÷ 1000 L) = ${smartUnit(totalDose, 'ml')}`;
  } else if (dosageUnit === 'g/kg feed' && feedKg) {
    const f = parseFloat(feedKg);
    const perKg = dosageNum || 0.75;
    totalDose = f * perKg;
    calcStr = `${f} kg × ${perKg} g/kg = ${smartUnit(totalDose, 'g')}`;
  } else if (dosageUnit === 'mg/kg' && animalCount) {
    const n = parseFloat(animalCount);
    totalDose = n * bodyWeight * (dosageNum / 1000);
    calcStr = `${n} ${animalLabel} × ${bodyWeight}kg × ${dosageNum}mg/kg = ${smartUnit(totalDose, 'mg')}`;
  } else if (dosageUnit === 'dose/animal' && animalCount) {
    const n = parseFloat(animalCount);
    totalDose = n * (dosageNum || 1);
    calcStr = `${n} ${animalLabel} × 1 ${doseLabel}`;
  } else if (dosageUnit === 'g/animal' && animalCount) {
    const n = parseFloat(animalCount);
    const gPerAnimal = dosageNum || 15;
    totalDose = n * gPerAnimal;
    const perAnimalLabel = lang === 'EN' ? 'g/animal' : lang === 'AZ' ? 'q/heyvan' : 'г/животное';
    calcStr = `${n} ${animalLabel} × ${gPerAnimal}${perAnimalLabel} = ${smartUnit(totalDose, 'g')}`;
  } else if (dosageUnit === 'ml/animal' && animalCount) {
    const n = parseFloat(animalCount);
    const mlPerAnimal = dosageNum || 2;
    totalDose = n * mlPerAnimal;
    const perAnimalLabel = lang === 'EN' ? 'ml/animal' : lang === 'AZ' ? 'ml/heyvan' : 'мл/животное';
    calcStr = `${n} ${animalLabel} × ${mlPerAnimal}${perAnimalLabel} = ${smartUnit(totalDose, 'ml')}`;
  }

  if (totalDose === null) return null;

  return {
    id: p.id,
    name: getProductName(p.name, lang),
    brand: p.brand || 'Generic',
    category: getCategoryLabel(p.category, lang),
    clinical_indication: p.clinical_indication,
    totalDose,
    calcStr,
    route: p.route_of_administration || (lang === 'EN' ? 'Oral' : lang === 'AZ' ? 'Ağız' : 'Пероральный'),
    frequency: p.treatment_duration || (lang === 'EN' ? 'As directed' : lang === 'AZ' ? 'Yönəldildiyi kimi' : 'По назначению'),
    unit: dosageUnit,
    notes: p.features?.[0] || p.description,
  };
  }).filter(p => p !== null);
}

// Smart unit display: auto-convert ml→L if ≥1000, g→kg if ≥1000
function smartUnit(value, unit) {
  if (unit === 'ml' && value >= 1000) return `${parseFloat((value / 1000).toFixed(3))} L`;
  if (unit === 'g' && value >= 1000) return `${parseFloat((value / 1000).toFixed(3))} kg`;
  return `${parseFloat(value.toFixed(2))} ${unit}`;
}

function formatNum(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(2)} k`;
  if (n < 1 && n > 0) return n.toFixed(3);
  return parseFloat(n.toFixed(2)).toString();
}

export default function DosingModal({ open, onClose }) {
  const { t, lang } = useLang();
  const d = t.dosing;
  const ui = UI_TEXT[lang] || UI_TEXT.EN;

  const [species, setSpecies] = useState('');
  const [waterVolume, setWaterVolume] = useState('');
  const [feedWeight, setFeedWeight] = useState('');
  const [animalCount, setAnimalCount] = useState('');
  const [productLine, setProductLine] = useState('xvet');
  const [doses, setDoses] = useState(null);
  const [showImmucell, setShowImmucell] = useState(false);
  const [liveProducts, setLiveProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Load products from database on modal open + subscribe to real-time updates
  useEffect(() => {
    if (open) {
      setLoadingProducts(true);
      base44.entities.Product.list()
        .then(products => {
          setLiveProducts(products || []);
          setLoadingProducts(false);
        })
        .catch(err => {
          console.error('Failed to load products:', err);
          setLoadingProducts(false);
        });

      // Subscribe to real-time product changes
      const unsubscribe = base44.entities.Product.subscribe((event) => {
        base44.entities.Product.list()
          .then(products => {
            setLiveProducts(products || []);
            // Auto-recalculate dosages if inputs are filled
            if (species && (waterVolume || feedWeight || animalCount) && productLine === 'xvet') {
              handleGenerate();
            }
          })
          .catch(err => console.error('Failed to refresh products:', err));
      });

      return () => unsubscribe();
    }
  }, [open, species, waterVolume, feedWeight, animalCount, productLine]);

  // Force newborn calf for ImmuCell
  useEffect(() => {
    if (productLine === 'immucell') {
      setSpecies('Bovine (Cattle)');
    }
  }, [productLine]);

  const inputClass = "w-full bg-background/80 border border-primary/20 rounded-lg px-4 py-3 font-inter text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200 disabled:opacity-40";
  const labelClass = "font-mono text-[10px] tracking-[3px] text-muted-foreground mb-2 block";

  const handleGenerate = () => {
    setDoses(null);
    setShowImmucell(false);

    if (productLine === 'immucell') {
      setShowImmucell(true);
      return;
    }

    const speciesKey = SPECIES_MAP[species] || '';
    const result = calculateDosesFromProducts(
      liveProducts,
      speciesKey,
      waterVolume,
      feedWeight,
      animalCount,
      lang
    );
    setDoses(result);
  };

  const canGenerate = productLine === 'immucell'
    ? !!species
    : !!species && (!!waterVolume || !!feedWeight || !!animalCount);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(20px)', background: 'hsl(220 20% 6% / 0.85)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl"
            style={{
              background: 'hsl(220 18% 10%)',
              border: '1px solid hsl(174 100% 54% / 0.25)',
              boxShadow: '0 0 60px hsl(174 100% 54% / 0.12), 0 0 120px hsl(174 100% 54% / 0.05)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
              style={{ borderColor: 'hsl(174 100% 54% / 0.15)', background: 'hsl(174 100% 54% / 0.05)' }}
            >
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-primary" style={{ filter: 'drop-shadow(0 0 6px hsl(174 100% 54% / 0.8))' }} />
                <div>
                  <div className="font-orbitron text-sm font-bold text-foreground tracking-wide">{d.title}</div>
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest flex items-center gap-2">
                    <FlaskConical className="w-3 h-3 text-primary/60" />
                    {lang === 'EN' ? 'LIVE DATABASE · IMMU CELL · VETERINARY CATALOG' : lang === 'AZ' ? 'CAN-VAXTIDA VERILƏN BAZASI · IMMUCELL · BAYTARLIQLIQ KATALOQU' : 'ТЕКУЩАЯ БД · IMMUCELL · ВЕТЕРИНАРНЫЙ КАТАЛОГ'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60" style={{ boxShadow: '0 0 6px hsl(174 100% 54% / 0.6)' }} />
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors ml-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">

              {/* Product Line Toggle */}
              <div>
                <label className={labelClass}>{ui.productLine}</label>
                <div className="flex gap-3">
                  {['xvet', 'immucell'].map((pl) => (
                    <button
                      key={pl}
                      onClick={() => { setProductLine(pl); setDoses(null); setShowImmucell(false); }}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-orbitron text-[11px] tracking-widest border transition-all duration-200 ${
                        productLine === pl
                          ? 'border-primary/60 bg-primary/10 text-primary shadow-[0_0_12px_hsl(174_100%_54%/0.2)]'
                          : 'border-border/40 text-muted-foreground hover:border-primary/30'
                      }`}
                    >
                      {pl === 'xvet' ? <FlaskConical className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      {ui[pl]}
                    </button>
                  ))}
                </div>
              </div>

              {/* ImmuCell note */}
              {productLine === 'immucell' && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg px-4 py-3 flex items-center gap-3"
                  style={{ background: 'hsl(174 100% 54% / 0.06)', border: '1px solid hsl(174 100% 54% / 0.2)' }}>
                  <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-mono text-[10px] tracking-wider text-muted-foreground">{ui.immucellNote}</span>
                </motion.div>
              )}

              {/* Species */}
              <div>
                <label className={labelClass}>{d.species}</label>
                <select 
                  value={species} 
                  onChange={(e) => setSpecies(e.target.value)} 
                  className={inputClass}
                  disabled={productLine === 'immucell'}
                >
                  {productLine === 'immucell' ? (
                  <option value="Bovine (Cattle)">{lang === 'EN' ? 'Newborn Calf (ImmuCell Only)' : lang === 'AZ' ? 'Yeni Doğulmuş Buznuq (Yalnız ImmuCell)' : 'Новорождённый Телёнок (Только ImmuCell)'}</option>
                  ) : (
                    <>
                      <option value="">—</option>
                      {d.speciesOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </>
                  )}
                </select>
              </div>

              {/* Three input fields — XVET only */}
              {productLine === 'xvet' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>{ui.waterLabel}</label>
                    <input
                      type="number" value={waterVolume}
                      onChange={(e) => setWaterVolume(e.target.value)}
                      placeholder={ui.waterPlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{ui.feedLabel}</label>
                    <input
                      type="number" value={feedWeight}
                      onChange={(e) => setFeedWeight(e.target.value)}
                      placeholder={ui.feedPlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{ui.animalLabel}</label>
                    <input
                      type="number" value={animalCount}
                      onChange={(e) => setAnimalCount(e.target.value)}
                      placeholder={ui.animalPlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!canGenerate || loadingProducts}
                className="w-full font-orbitron text-xs tracking-widest py-5 disabled:opacity-40"
                style={{ background: 'hsl(174 100% 54%)', color: 'hsl(220 20% 6%)', boxShadow: '0 0 20px hsl(174 100% 54% / 0.4)' }}
              >
                <Zap className="w-4 h-4 mr-2" />{d.generate}
              </Button>

              {/* ── Results panel ── */}
              <AnimatePresence>

                {/* ImmuCell fixed result */}
                {showImmucell && (
                  <motion.div
                    key="immucell-result"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-xl p-5"
                    style={{ background: 'hsl(174 100% 54% / 0.08)', border: '1px solid hsl(174 100% 54% / 0.3)', boxShadow: '0 0 20px hsl(174 100% 54% / 0.08)' }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ boxShadow: '0 0 6px hsl(174 100% 54%)' }} />
                      <span className="font-mono text-[10px] tracking-[4px] text-primary">▸ {ui.immucellHeader}</span>
                    </div>
                    <div className="flex items-center justify-center py-6">
                      <span className="font-orbitron text-4xl font-bold text-primary" style={{ textShadow: '0 0 20px hsl(174 100% 54% / 0.6)' }}>
                        {lang === 'EN' ? '1 Dose / 1 Syringe' : lang === 'AZ' ? '1 Doza / 1 Şringə' : '1 Доза / 1 Шприц'}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Veterinary Catalog calculated results */}
                {doses !== null && (
                  <motion.div
                    key="xvet-result"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-xl overflow-hidden"
                    style={{ border: '1px solid hsl(174 100% 54% / 0.25)', boxShadow: '0 0 20px hsl(174 100% 54% / 0.06)' }}
                  >
                    {/* Result header bar */}
                    <div className="px-5 py-3 flex items-center gap-2"
                      style={{ background: 'hsl(174 100% 54% / 0.08)', borderBottom: '1px solid hsl(174 100% 54% / 0.15)' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ boxShadow: '0 0 6px hsl(174 100% 54%)' }} />
                      <span className="font-mono text-[10px] tracking-[4px] text-primary">▸ {ui.resultHeader}</span>
                    </div>

                    {loadingProducts ? (
                      <div className="p-6 flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-mono text-sm">{ui.loading}</span>
                      </div>
                    ) : doses.length === 0 ? (
                      <div className="p-6 font-mono text-sm text-muted-foreground text-center">{ui.noProducts}</div>
                    ) : (
                      <div className="divide-y" style={{ background: 'hsl(174 100% 54% / 0.03)', borderColor: 'hsl(174 100% 54% / 0.1)' }}>
                        {doses.map((dose, i) => (
                          <motion.div
                            key={dose.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="p-5"
                            style={{ borderColor: 'hsl(174 100% 54% / 0.1)' }}
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <div className="font-orbitron text-sm font-bold text-foreground">{dose.name}</div>
                                <div className="font-mono text-[10px] tracking-wider text-primary/60 mt-0.5">{dose.brand}</div>
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                <span className="font-orbitron text-sm font-bold text-primary">
                                  {smartUnit(dose.totalDose, dose.unit)}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <Row label={ui.calcLabel} value={dose.calcStr} mono />
                              <Row label={ui.totalLabel} value={smartUnit(dose.totalDose, dose.unit)} highlight />
                              <Row label={ui.routeLabel} value={dose.route} />
                              <Row label={ui.freqLabel} value={dose.frequency} />
                              {dose.clinical_indication && <Row label={lang === 'EN' ? 'Clinical Indication' : lang === 'AZ' ? 'Klinik Göstəriş' : 'Клиническое показание'} value={dose.clinical_indication} muted />}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
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

function Row({ label, value, mono, highlight, muted }) {
  return (
    <div className="flex items-start gap-3">
      <span className="font-mono text-[9px] tracking-[2px] text-muted-foreground/60 flex-shrink-0 pt-0.5 w-24">{label}</span>
      <span className={`font-inter text-xs leading-relaxed ${
        highlight ? 'text-primary font-bold' : muted ? 'text-muted-foreground' : mono ? 'font-mono text-foreground/80' : 'text-foreground'
      }`}>{value}</span>
    </div>
  );
}