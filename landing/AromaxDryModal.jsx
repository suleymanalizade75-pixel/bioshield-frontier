import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Aromax® Dry', 'Powder', 'Feed Intake'] : lang === 'AZ' ? ['Aromax® Dry', 'Toz', 'Yem İstehsalı'] : ['Aromax® Dry', 'Порошок', 'Потребление Корма'],
  tagline: lang === 'EN' ? 'Boost the appetite' : lang === 'AZ' ? 'İştahanı artırın' : 'Усильте аппетит',
  features: lang === 'EN' ? 'Aromax® Dry is a rich synergic combination of etheric essential oils from eucalyptus, thyme and mint in powder form. It has especially been designed to stimulate appetite, improve feed consumption, feed conversion and weight gain, while promoting a healthy gut flora and improved digestion.' : lang === 'AZ' ? 'Aromax® Dry toz formasında evkalipt, kəklikotu və nanədən gələn efir əssensial yağların zəngin sinergik kombinasiyasıdır. Xüsusilə iştahanı stimullaşdırmaq, yem istehlakını, yem çevrilməsini və çəki artımını yaxşılaşdırmaq, sağlam bağırsaq florasını irəliləmək və həzmi yaxşılaşdırmaq üçün hazırlanmışdır.' : 'Aromax® Dry — богатая синергетическая комбинация эфирных масел эвкалипта, тимьяна и мяты в порошкообразной форме. Специально разработан для стимуляции аппетита, улучшения потребления корма, конверсии корма и прироста живой массы, а также для поддержания здоровой микрофлоры кишечника и улучшения пищеварения.',
  benefits: lang === 'EN' ? ['Supports young animals in case of respiratory problems.', 'Enhances appetite and supports digestion at all ages.', 'Helps to improve weight gain and feed conversion ratio (FCR).', 'Provides an additional support to the respiratory system in times of challenges such as low temperatures or high relative humidity.'] : lang === 'AZ' ? ['Tənəffüs problemləri zamanı gənc heyvanlara dəstək olur.', 'Bütün yaşlarda iştahanı artırır və həzmi dəstəkləyir.', 'Çəki artımını və yem çevrilmə nisbətini (FCR) yaxşılaşdırmağa kömək edir.', 'Aşağı temperatur və ya yüksək nisbi rütubət kimi çətin dövrlər zamanı tənəffüs sisteminə əlavə dəstək verir.'] : ['Поддерживает молодых животных при респираторных проблемах.', 'Повышает аппетит и поддерживает пищеварение в любом возрасте.', 'Помогает улучшить прирост живой массы и конверсию корма (FCR).', 'Обеспечивает дополнительную поддержку дыхательной системы в сложные периоды, такие как низкие температуры или высокая влажность.'],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALAR' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '1 kg and 20 kg alu bags' : lang === 'AZ' ? '1 kq və 20 kq alu çantalar' : '1 кг и 20 кг алюминиевые пакеты',
});

export default function AromaxDryModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[400] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,4,0.82)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(8,28,12,0.97) 0%, rgba(5,18,8,0.99) 100%)', border: '1px solid rgba(192,57,43,0.3)', boxShadow: '0 0 60px rgba(192,57,43,0.12), 0 40px 80px rgba(0,0,0,0.7)' }}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(192,57,43,0.18)', background: 'rgba(192,57,43,0.05)' }}>
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">Aro<span style={{ color: '#c0392b' }}>max</span>® Dry</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(192,57,43,0.55)' }}>XVET · POWDER SUPPLEMENT</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-wrap gap-2">{data.tags.map(tag => (<span key={tag} className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.35)', color: '#c0392b' }}>{tag}</span>))}</div>
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#c0392b' }}>{data.tagline}</div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56" style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(192,57,43,0.25)' }}><img src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/738e03c9b_image.png" alt="Aromax Dry product" className="w-full object-contain" style={{ maxHeight: '220px' }} /></div>
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(192,57,43,0.6)' }}>{data.featureLabel}</div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>{data.features}</p>
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.2)' }}>
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(192,57,43,0.6)' }}>{data.benefitsLabel}</div>
                <div className="space-y-3">{data.benefits.map((b, idx) => (<div key={idx} className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#c0392b' }} /><span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span></div>))}</div>
              </div>
              <div className="flex items-start gap-3"><Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(192,57,43,0.6)' }} /><div><div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(192,57,43,0.6)' }}>{data.packagingLabel}</div><span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{data.packagingDesc}</span></div></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}