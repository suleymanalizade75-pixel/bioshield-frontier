import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['TanniFit Plus Dry', 'Water Soluble Powder', 'Gut Health'] : lang === 'AZ' ? ['TanniFit Plus Dry', 'Suda Həll Olunan Toz', 'Bağırsaq Sağlamlığı'] : ['TanniFit Plus Dry', 'Водорастворимый Порошок', 'Здоровье Кишечника'],
  features: lang === 'EN'
    ? 'TanniFit Plus Dry is a complementary feed with botanical ingredients in order to stabilize water and electrolyte balance to support a physiological digestion in the early life of calves and lambs. The tannin-rich formula has astringent and anti-inflammatory effects on the gut mucosa. Essential oil of Oregano is well-known for its anti-inflammatory, antimicrobial and anti-fungal effects as well as its potential to reduce oxidative stress. The combination of these botanical ingredients might stimulate the appetite in challenging times.'
    : lang === 'AZ'
    ? 'TanniFit Plus Dry, buzovlar və quzuların erkən həyatında fizyoloji həzmi dəstəkləmək üçün su-elektrolit balansını sabitləşdirən botanik ingrediyentli əlavə yemlərdir. Tannin baxımından zəngin formula bağırsaq selikli qişasına büzücü və iltihab əleyhinə təsir göstərir. Kəklikotu efir yağı iltihab əleyhinə, antimikrob və antifungal təsirləri ilə oksidativ stresi azaltmaq potensialına görə məşhurdur. Bu botanik ingrediyentlərin birləşməsi çətin dövrlərdə iştahanı stimullaşdıra bilər.'
    : 'TanniFit Plus Dry — это дополнительный корм с растительными ингредиентами для стабилизации водно-электролитного баланса и поддержки физиологического пищеварения в раннем возрасте телят и ягнят. Богатая таннинами формула оказывает вяжущее и противовоспалительное действие на слизистую оболочку кишечника. Эфирное масло орегано хорошо известно своими противовоспалительными, антимикробными и противогрибковыми свойствами, а также способностью снижать окислительный стресс. Сочетание этих растительных ингредиентов может стимулировать аппетит в сложные периоды.',
  gutHealthLabel: lang === 'EN' ? 'Gut Health' : lang === 'AZ' ? 'Bağırsaq Sağlamlığı' : 'Здоровье Кишечника',
  gutHealthDesc: lang === 'EN' ? 'Bring the digestive system back on track' : lang === 'AZ' ? 'Həzm sistemini yenidən işə salın' : 'Верните пищеварительную систему в норму',
  benefits: lang === 'EN' ? [
    'Quick regulation of intestinal disturbances',
    'Anti-inflammatory and antimicrobial effects',
    'A protected digestive tract',
    'Reduction of pathogen pressure',
  ] : lang === 'AZ' ? [
    'Bağırsaq pozuntularının sürətli tənzimlənməsi',
    'Iltihab əleyhinə və antimikrob təsirlər',
    'Qorunan həzm traktı',
    'Patogen təzyiqinin azaldılması',
  ] : [
    'Быстрое устранение кишечных расстройств',
    'Противовоспалительные и антимикробные эффекты',
    'Защищённый пищеварительный тракт',
    'Снижение патогенной нагрузки',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '1 kg alu bag, 5 kg bucket, 20 kg alu bags' : lang === 'AZ' ? '1 kq alüminium torba, 5 kq vedrə, 20 kq alüminium torbalar' : '1 кг алюминиевый пакет, 5 кг ведро, 20 кг алюминиевые пакеты',
});

export default function TanniFitPlusModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,4,0.82)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(8,28,12,0.97) 0%, rgba(5,18,8,0.99) 100%)',
              border: '1px solid rgba(52,211,153,0.3)',
              boxShadow: '0 0 60px rgba(52,211,153,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(52,211,153,0.18)',
                background: 'rgba(52,211,153,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Tanni<span style={{ color: '#22c55e' }}>Fit Plus</span>
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(52,211,153,0.55)' }}>
                  XVET · BOTANICAL DIGESTIVE SUPPORT
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
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {data.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(52,211,153,0.12)',
                      border: '1px solid rgba(52,211,153,0.35)',
                      color: '#34d399',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(52,211,153,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/b9d76b82e_image.png"
                    alt="TanniFit Plus Dry product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(52,211,153,0.6)' }}>
                    {data.featureLabel}
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {data.features}
                  </p>
                  <div className="font-inter text-xs leading-relaxed mt-3" style={{ color: 'rgba(52,211,153,0.8)' }}>
                    <strong>{data.gutHealthLabel}</strong><br />{data.gutHealthDesc}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(52,211,153,0.06)',
                  border: '1px solid rgba(52,211,153,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(52,211,153,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#34d399' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(52,211,153,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(52,211,153,0.6)' }}>{data.packagingLabel}</div>
                  <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {data.packagingDesc}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
