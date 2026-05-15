import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['TanniFit Plus', 'Liquid Pump', 'Gut Health'] : lang === 'AZ' ? ['TanniFit Plus', 'Maye Nasos', 'Həzm Sağlığı'] : ['TanniFit Plus', 'Жидкий Насос', 'Здоровье ЖКТ'],
  features: lang === 'EN' ? 'TanniFit Plus is a dietary complementary feed with botanical ingredients in order to stabilize water and electrolyte balance to support a physiological digestion in the early life of suckling piglets, lambs and goat kids. The tannin-rich formula has astringent and anti-inflammatory effects on the gut mucosa. Essential oils of Thyme and Oregano are well-known for their antimicrobial effects on Gram+ and Gram- bacteria, anti-fungal effects, as well as their potential to reduce oxidative stress.' : lang === 'AZ' ? 'TanniFit Plus əmzikli donuz balalarının, quzuların və keçi cavanlarının erkən həyatında fizioloji həzmi dəstəkləmək üçün su və elektrolit balansını sabitləşdirmək məqsədilə botanik inqrediyentlər olan dietik tamamlayıcı yemdir. Tannin-zəngin formula bağırsaq mukozasına büzücü və iltihab əleyhinə təsirlər göstərir. Kəklikotu və oregano əssensial yağları Gram+ və Gram- bakteriyalara antimikrob, antifungal təsirləri və oksidativ stressi azaltmaq potensialı ilə tanınır.' : 'TanniFit Plus — диетический дополнительный корм с растительными ингредиентами для стабилизации водно-электролитного баланса и поддержки физиологического пищеварения в раннем возрасте сосунов, ягнят и козлят. Богатая танинами формула оказывает вяжущее и противовоспалительное действие на слизистую кишечника. Эфирные масла тимьяна и орегано известны своим антимикробным и противогрибковым действием.',
  gutHealthLabel: lang === 'EN' ? 'Gut Health · Early Care' : lang === 'AZ' ? 'Həzm Sağlığı · Erkən Qayğı' : 'Здоровье ЖКТ · Ранний Уход',
  gutHealthDesc: lang === 'EN' ? 'Make your little ones fit again' : lang === 'AZ' ? 'Kiçiklərinizi yenidən sağlam edin' : 'Верните здоровье вашим малышам',
  benefits: lang === 'EN' ? ['Quick regulation of intestinal disturbances', 'A protected digestive tract', 'Anti-inflammatory and antimicrobial effects', 'Reduction of pathogen pressure', 'Quickly and easily applicable with a doser'] : lang === 'AZ' ? ['Bağırsaq pozulmalarının sürətli tənzimlənməsi', 'Qorunan həzm traktı', 'İltihab əleyhinə və antimikrob təsirlər', 'Patogen təzyiqinin azaldılması', 'Dozatorla sürətli və asanlıqla tətbiq'] : ['Быстрое устранение кишечных нарушений', 'Защищённый пищеварительный тракт', 'Противовоспалительное и антимикробное действие', 'Снижение патогенного давления', 'Быстрое и лёгкое применение с помощью дозатора'],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALAR' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml and 500 ml bottles with special pump applicator available (per 6 bottles an applicator is supplied)' : lang === 'AZ' ? '250 ml və 500 ml şişələr xüsusi nasos tətbiqçi ilə mövcuddur (hər 6 şişəyə bir tətbiqçi verilir)' : '250 мл и 500 мл бутылки со специальным насосным аппликатором (на каждые 6 бутылок прилагается аппликатор)',
});

export default function TanniFitPlusLiquidModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[400] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,4,0.82)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(8,28,12,0.97) 0%, rgba(5,18,8,0.99) 100%)', border: '1px solid rgba(34,211,102,0.3)', boxShadow: '0 0 60px rgba(34,211,102,0.12), 0 40px 80px rgba(0,0,0,0.7)' }}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(34,211,102,0.18)', background: 'rgba(34,211,102,0.05)' }}>
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">Tanni<span style={{ color: '#22c55e' }}>Fit Plus</span></div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(34,211,102,0.55)' }}>XVET · BOTANICAL DIGESTIVE SUPPORT</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-wrap gap-2">{data.tags.map(tag => (<span key={tag} className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(34,211,102,0.12)', border: '1px solid rgba(34,211,102,0.35)', color: '#22c55e' }}>{tag}</span>))}</div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56" style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(34,211,102,0.25)' }}><img src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/69a274d6e_image.png" alt="TanniFit Plus Liquid product" className="w-full object-contain" style={{ maxHeight: '220px' }} /></div>
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(34,211,102,0.6)' }}>{data.featureLabel}</div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>{data.features}</p>
                  <div className="font-inter text-xs leading-relaxed mt-3" style={{ color: 'rgba(34,211,102,0.8)' }}><strong>{data.gutHealthLabel}</strong><br />{data.gutHealthDesc}</div>
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: 'rgba(34,211,102,0.06)', border: '1px solid rgba(34,211,102,0.2)' }}>
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(34,211,102,0.6)' }}>{data.benefitsLabel}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{data.benefits.map(b => (<div key={b} className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} /><span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span></div>))}</div>
              </div>
              <div className="flex items-start gap-3"><Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(34,211,102,0.6)' }} /><div><div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(34,211,102,0.6)' }}>{data.packagingLabel}</div><span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{data.packagingDesc}</span></div></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}