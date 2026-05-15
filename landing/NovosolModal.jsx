import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Gut Health', 'NAGP', 'One step forward', 'Liquid'] : lang === 'AZ' ? ['Həzm Sağlığı', 'NAGP', 'Bir addım irəli', 'Maye'] : ['Здоровье ЖКТ', 'NAGP', 'Шаг вперёд', 'Жидкая'],
  features: lang === 'EN' ? 'Novosol® is a combination of fatty acids and essential oils targeting intestinal mucosa. Fatty acids provide the benefits of organic acids without the dependency on pH for activity. They maintain the action through the entire intestinal tract, without being degraded or buffered. Together with the great antioxidant synergy from essential oils, Novosol® is a perfect tool for intensive production with increased pressure, especially in the peak or in the final period of fattening, laying or lactation.' : lang === 'AZ' ? 'Novosol® bağırsaq mukozasını hədəf alan yağ turşuları və əssensial yağların kombinasiyasıdır. Yağ turşuları üzvi turşuların aktivlik üçün pH-dan asılılıq olmadan faydalarını təmin edir. Onlar bütün bağırsaq boyunca parçalanmadan və ya tamponlanmadan fəaliyyətlərini saxlayırlar. Əssensial yağların böyük antioksidant sinergizmi ilə birlikdə Novosol® artan təzyiq şəraitindəki intensiv istehsal üçün, xüsusilə kökəltmə, yumurta istehsalı və ya laktasiyanın zirvə dövründə mükəmməl vasitədir.' : 'Novosol® — это комбинация жирных кислот и эфирных масел, нацеленная на кишечную слизистую. Жирные кислоты обеспечивают преимущества органических кислот без зависимости от pH. Они сохраняют действие по всему кишечному тракту. Вместе с синергией антиоксидантов из эфирных масел Novosol® является идеальным инструментом для интенсивного производства с повышенной нагрузкой.',
  benefits: lang === 'EN' ? ['Quick protection of digestive tract from the beginning', 'Decreased incidence of complications from opportunistic harmful factors', 'Promotion of a healthy intestinal mucosa, for supporting body own resistance and absorption of nutrients', 'Better FCR, weight gain, and liveability'] : lang === 'AZ' ? ['Həzm traktının başlanğıcdan sürətli qorunması', 'Fürsətçi zərərli faktorlardan fəsadların azalması', 'Sağlam bağırsaq mukozasının stimullaşdırılması, orqanizmin öz müqavimətini dəstəkləmək üçün', 'Daha yaxşı FCR, çəki artımı və canlılıq'] : ['Быстрая защита пищеварительного тракта с самого начала', 'Снижение частоты осложнений от оппортунистических вредных факторов', 'Поддержание здоровой слизистой кишечника для поддержки собственной устойчивости организма', 'Лучший FCR, прирост живой массы и жизнеспособность'],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALAR' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '1 l bottle, 5 l and 25 l canister' : lang === 'AZ' ? '1 l şişə, 5 l və 25 l kanister' : '1 л бутылка, 5 л и 25 л канистра',
});

export default function NovosolModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[400] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,4,0.82)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(8,28,12,0.97) 0%, rgba(5,18,8,0.99) 100%)', border: '1px solid rgba(52,211,153,0.3)', boxShadow: '0 0 60px rgba(52,211,153,0.12), 0 40px 80px rgba(0,0,0,0.7)' }}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(52,211,153,0.18)', background: 'rgba(52,211,153,0.05)' }}>
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">Novosol<span style={{ color: '#34d399' }}>®</span></div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(52,211,153,0.55)' }}>XVET · FATTY ACIDS & ESSENTIAL OILS</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-wrap gap-2">{data.tags.map(tag => (<span key={tag} className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.35)', color: '#34d399' }}>{tag}</span>))}</div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56" style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(52,211,153,0.25)' }}><img src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/c6717cdab_image.png" alt="Novosol® product" className="w-full object-contain" style={{ maxHeight: '180px' }} /></div>
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(52,211,153,0.6)' }}>{data.featureLabel}</div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>{data.features}</p>
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(52,211,153,0.6)' }}>{data.benefitsLabel}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{data.benefits.map(b => (<div key={b} className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#34d399' }} /><span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span></div>))}</div>
              </div>
              <div className="flex items-start gap-3"><Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(52,211,153,0.6)' }} /><div><div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(52,211,153,0.6)' }}>{data.packagingLabel}</div><span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{data.packagingDesc}</span></div></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}