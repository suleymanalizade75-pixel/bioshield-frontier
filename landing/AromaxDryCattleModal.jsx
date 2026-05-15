import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tagPowder: lang === 'EN' ? 'POWDER' : lang === 'AZ' ? 'TOZ' : 'ПОРОШОК',
  tagBoost: lang === 'EN' ? 'BOOST THE APPETITE' : lang === 'AZ' ? 'İŞTAHANI ARTIRIN' : 'УСИЛЬТЕ АППЕТИТ',
  features: lang === 'EN' ? 'Aromax® Dry is a rich synergic combination of etheric essential oils from eucalyptus, thyme, and mint in powder form. It has been specially designed to stimulate appetite, improve feed consumption, feed conversion, and weight gain, while promoting a healthy gut flora and improved digestion.' : lang === 'AZ' ? 'Aromax® Dry toz formasında evkalipt, kəklikotu və nanədən gələn efir əssensial yağların zəngin sinergik kombinasiyasıdır. Xüsusilə iştahanı stimullaşdırmaq, yem istehlakını, yem çevrilməsini və çəki artımını yaxşılaşdırmaq, sağlam bağırsaq florasını irəliləmək və həzmi yaxşılaşdırmaq üçün hazırlanmışdır.' : 'Aromax® Dry — богатая синергетическая комбинация эфирных масел эвкалипта, тимьяна и мяты в порошкообразной форме. Специально разработан для стимуляции аппетита, улучшения потребления, конверсии корма и прироста живой массы, а также для поддержания здоровой микрофлоры кишечника и улучшения пищеварения.',
  benefits: lang === 'EN' ? ['Supports young animals in case of respiratory problems', 'Enhances appetite and supports digestion at all ages', 'Helps to improve weight gain and feed conversion ratio (FCR)', 'Provides additional support to the respiratory system in times of challenges, such as low temperatures or high relative humidity'] : lang === 'AZ' ? ['Tənəffüs problemləri zamanı gənc heyvanlara dəstək olur', 'Bütün yaşlarda iştahanı artırır və həzmi dəstəkləyir', 'Çəki artımını və yem çevrilmə nisbətini (FCR) yaxşılaşdırmağa kömək edir', 'Aşağı temperatur və ya yüksək nisbi rütubət kimi çətin dövrlər zamanı tənəffüs sisteminə əlavə dəstək verir'] : ['Поддерживает молодых животных при респираторных проблемах', 'Повышает аппетит и поддерживает пищеварение в любом возрасте', 'Помогает улучшить прирост живой массы и конверсию корма (FCR)', 'Обеспечивает дополнительную поддержку дыхательной системы в сложные периоды'],
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALAR' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '1 kg and 20 kg alu bags' : lang === 'AZ' ? '1 kq və 20 kq alu çantalar' : '1 кг и 20 кг алюминиевые пакеты',
});

export default function AromaxDryCattleModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[400] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,20,0.85)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(8,20,35,0.97) 0%, rgba(5,14,25,0.99) 100%)', border: '1px solid rgba(56,189,248,0.3)', boxShadow: '0 0 60px rgba(56,189,248,0.1), 0 40px 80px rgba(0,0,0,0.7)' }}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(56,189,248,0.15)', background: 'rgba(56,189,248,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(56,189,248,0.15)', border: '1.5px solid rgba(56,189,248,0.45)', boxShadow: '0 0 14px rgba(56,189,248,0.4)' }}><Wind className="w-4 h-4" style={{ color: '#38bdf8', filter: 'drop-shadow(0 0 5px #38bdf8)' }} /></div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[3px]">AROMAX® DRY</div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(56,189,248,0.55)' }}>RESPIRATORY SYSTEM SUPPORT · FEED INTAKE</div>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex gap-5 items-start">
                <img src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/7dbefa8b5_image.png" alt="Aromax® Dry" className="w-32 h-40 object-contain rounded-xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(56,189,248,0.2)' }} />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[9px] tracking-[3px] px-2 py-1 rounded" style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)' }}>{data.tagPowder}</span>
                    <span className="font-mono text-[9px] tracking-[3px] px-2 py-1 rounded" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}>{data.tagBoost}</span>
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{data.features}</p>
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)' }}>
                <div className="font-orbitron text-[11px] font-bold tracking-widest mb-3" style={{ color: '#38bdf8' }}>{data.benefitsLabel}</div>
                <ul className="space-y-2">{data.benefits.map((b, i) => (<li key={i} className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#38bdf8' }} /><span className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{b}</span></li>))}</ul>
              </div>
              <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Package className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                <div>
                  <div className="font-orbitron text-[10px] tracking-widest font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{data.packagingLabel}</div>
                  <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{data.packagingDesc}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}