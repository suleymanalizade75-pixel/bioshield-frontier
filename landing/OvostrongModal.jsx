import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Ovostrong®', 'Powder', 'Egg Performance'] : lang === 'AZ' ? ['Ovostrong®', 'Toz', 'Yumurta Performansı'] : ['Ovostrong®', 'Порошок', 'Производство Яиц'],
  tagline: lang === 'EN' ? 'Good inside, tough outside' : lang === 'AZ' ? 'İçdən yaxşı, çöldən möhkəm' : 'Хорошее внутри, крепкое снаружи',
  features: lang === 'EN' ? 'Ovostrong® is formulated to supply all needs to support laying hens, especially in high production periods, and in older ages after week 40. The combination of marine algae meal, phytase, essential amino acids, highly bioavailable minerals such as phosphorous, magnesium, manganese, and finally coated butyric acid cover all requirements that are needed for the optimum egg laying performance. In Breeders this has a positive effect diminishing hidden eggshell cracks and supporting hatchability rates.' : lang === 'AZ' ? 'Ovostrong® xüsusilə yüksək istehsal dövrlərində və 40-cı həftədən sonra yaşlı dövrlərdə yumurta tutan toyuqları dəstəkləmək üçün bütün ehtiyacları təmin etmək məqsədilə formulə edilmişdir. Dəniz yosunu unu, fitaza, zəruri amino turşuları, fosfor, maqnezium, manqan kimi yüksək bioyararlanımlı mineralların və nəhayət örtülü bütirik turşunun birləşməsi optimal yumurta istehsalı üçün lazım olan bütün tələbləri ödəyir. Əcdadlarda gizli yumurta qabığı çatlarını azaltmaq və çimlənmə dərəcələrini dəstəkləmək baxımından müsbət təsiri var.' : 'Ovostrong® разработан для удовлетворения всех потребностей несушек, особенно в периоды высокого производства и в старшем возрасте после 40-й недели. Сочетание муки из морских водорослей, фитазы, незаменимых аминокислот, высокобиодоступных минералов (фосфор, магний, марганец) и покрытой масляной кислоты охватывает все требования для оптимальной яйценоскости. У родительских стад это оказывает положительное воздействие на снижение скрытых трещин скорлупы и поддержку выводимости.',
  benefits: lang === 'EN' ? ['Marine algeal meal contains calcium and magnesium as well as trace elements in a high available form. This increases the eggshell quality.', 'Butyric acid increases the villus proliferation in the small intestine. This ensures absorption.', 'Provides minerals that take part in egg shell formation.', 'High quality phytase eliminates phytic acid, releasing all available calcium and phosphorus from grains.'] : lang === 'AZ' ? ['Dəniz yosunu unu yüksək əlçatımlı formada kalsium, maqnezium və iz elementlərini ehtiva edir. Bu yumurta qabığı keyfiyyətini artırır.', 'Bütirik turşu nazik bağırsaqda villi proliferasiyasını artırır. Bu absorbsiyanı təmin edir.', 'Yumurta qabığı formalaşmasında iştirak edən minerallar təmin edir.', 'Yüksək keyfiyyətli fitaza fitik turşunu aradan qaldırır, taxıllardan mövcud kalsium və fosforu azad edir.'] : ['Мука из морских водорослей содержит кальций, магний и микроэлементы в высокодоступной форме. Это улучшает качество скорлупы яиц.', 'Масляная кислота увеличивает пролиферацию ворсинок в тонком кишечнике, обеспечивая абсорбцию.', 'Обеспечивает минералы, участвующие в формировании скорлупы.', 'Высококачественная фитаза устраняет фитиновую кислоту, высвобождая доступный кальций и фосфор из зерна.'],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALAR' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '10 kg and 25 kg craft bags' : lang === 'AZ' ? '10 kq və 25 kq kraft çantalar' : '10 кг и 25 кг крафт-мешки',
});

export default function OvostrongModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[400] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,4,0.82)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(8,28,12,0.97) 0%, rgba(5,18,8,0.99) 100%)', border: '1px solid rgba(192,57,43,0.3)', boxShadow: '0 0 60px rgba(192,57,43,0.12), 0 40px 80px rgba(0,0,0,0.7)' }}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(192,57,43,0.18)', background: 'rgba(192,57,43,0.05)' }}>
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">Ovo<span style={{ color: '#c0392b' }}>strong</span>®</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(192,57,43,0.55)' }}>XVET · POWDER SUPPLEMENT</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-wrap gap-2">{data.tags.map(tag => (<span key={tag} className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.35)', color: '#c0392b' }}>{tag}</span>))}</div>
              <div className="font-orbitron text-xl font-bold text-white tracking-wide" style={{ color: '#c0392b' }}>{data.tagline}</div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56" style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(192,57,43,0.25)' }}><img src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/1558a1921_image.png" alt="Ovostrong product" className="w-full object-contain" style={{ maxHeight: '220px' }} /></div>
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