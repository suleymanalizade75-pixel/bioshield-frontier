import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['E-Hydrolyte + C Pro', 'Water Soluble Powder', 'Heat Stress'] : lang === 'AZ' ? ['E-Hydrolyte + C Pro', 'Suda Həll Olan Toz', 'İstilik Stresi'] : ['E-Hydrolyte + C Pro', 'Водорастворимый Порошок', 'Тепловой Стресс'],
  features: lang === 'EN'
    ? 'Vitamin C supports the immune system and acts as an antistress agent. Electrolytes are important for reducing the effects of heat stress in hot conditions, increasing heat resistance, and maintaining an optimal blood pH level. They also help reduce stress due to transport, new housing, climate change, and high production yields. In addition, a quick source of energy helps prevent dehydration and aids in the animal\'s recovery from it. The energy source in this formula provides fast, available energy that promotes the absorption of water and sodium at the intestinal level. The balanced mixture of electrolytes provides an effective blood buffer.'
    : lang === 'AZ'
    ? 'C vitamini immunitet sistemini dəstəkləyir və antistres agent kimi fəaliyyət göstərir. Elektrolitlər isti şəraitdə istilik stresinin təsirlərini azaltmaq, istiliyə dözümlülüyü artırmaq və optimal qan pH səviyyəsini saxlamaq üçün vacibdir. Onlar həmçinin nəqliyyat, yeni yerləşdirmə, iqlim dəyişikliyi və yüksək məhsuldarlıqdan yaranan stresi azaltmağa kömək edir. Bundan əlavə, sürətli enerji mənbəyi susuzluğun qarşısını alır və heyvanın ondan sağalmasına kömək edir. Bu formuladakı enerji mənbəyi bağırsaq səviyyəsində su və natriumun sorulmasını təşviq edən sürətli, əlçatan enerji təmin edir. Elektrolitlərin balanslaşdırılmış qarışığı effektiv qan tamponu təmin edir.'
    : 'Витамин C поддерживает иммунную систему и действует как антистрессовый агент. Электролиты важны для снижения воздействия теплового стресса в жарких условиях, повышения термоустойчивости и поддержания оптимального pH крови. Они также помогают снизить стресс, вызванный транспортировкой, сменой условий содержания, изменением климата и высокой продуктивностью. Кроме того, быстрый источник энергии помогает предотвратить обезвоживание и способствует восстановлению животного. Источник энергии в этой формуле обеспечивает быстро доступную энергию, стимулирующую всасывание воды и натрия на кишечном уровне. Сбалансированная смесь электролитов обеспечивает эффективный буфер крови.',
  benefits: lang === 'EN' ? [
    'Vitamin C is a support to the immune system.',
    'Provides a fast-absorbing source of energy',
    'Provides all electrolytes needed to avoid dehydration',
    'Supports the blood pH balance',
    'Replaces electrolytes lost caused by stress',
    'Reduces the effects of the heat stress',
  ] : lang === 'AZ' ? [
    'C vitamini immunitet sistemini dəstəkləyir.',
    'Sürətli sorulmaqla enerji mənbəyi təmin edir',
    'Susuzluğun qarşısını almaq üçün lazım olan bütün elektrolitləri təmin edir',
    'Qanın pH balansını dəstəkləyir',
    'Stress nəticəsində itirilən elektrolitləri əvəz edir',
    'İstilik stresinin təsirlərini azaldır',
  ] : [
    'Витамин C поддерживает иммунную систему.',
    'Обеспечивает быстро усваиваемый источник энергии',
    'Обеспечивает все электролиты, необходимые для предотвращения обезвоживания',
    'Поддерживает баланс pH крови',
    'Восполняет электролиты, потерянные вследствие стресса',
    'Снижает воздействие теплового стресса',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '1 kg and 20 kg aluminum bags, 5 kg and 10 kg buckets' : lang === 'AZ' ? '1 kq və 20 kq alüminium torba, 5 kq və 10 kq vedrə' : '1 кг и 20 кг алюминиевые пакеты, 5 кг и 10 кг вёдра',
});

export default function EHydrolyteModal({ open, onClose }) {
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
              border: '1px solid rgba(251,191,36,0.3)',
              boxShadow: '0 0 60px rgba(251,191,36,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(251,191,36,0.18)',
                background: 'rgba(251,191,36,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  E-Hydrolyte + C Pro
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(251,191,36,0.55)' }}>
                  XVET · WATER SOLUBLE POWDER
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
                      background: 'rgba(251,191,36,0.12)',
                      border: '1px solid rgba(251,191,36,0.35)',
                      color: '#fbbf24',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tagline */}
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#fbbf24' }}>
                Back to Hydration
              </div>

              {/* Product image + description */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(251,191,36,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/9a2a077a2_image.png"
                    alt="E-Hydrolyte + C Pro product"
                    className="w-full object-contain"
                    style={{ maxHeight: '220px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(251,191,36,0.6)' }}>
                    {data.featureLabel}
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {data.features}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(251,191,36,0.06)',
                  border: '1px solid rgba(251,191,36,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(251,191,36,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="space-y-3">
                  {data.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(251,191,36,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(251,191,36,0.6)' }}>{data.packagingLabel}</div>
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
