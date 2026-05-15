import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Quick Recovery', 'Heat Stress', 'Problem solved', 'Liquid'] : lang === 'AZ' ? ['Sürətli Bərpa', 'İsti Stress', 'Problem həll edildi', 'Maye'] : ['Быстрое Восстановление', 'Тепловой Стресс', 'Проблема решена', 'Жидкая'],
  features: lang === 'EN' ? '42 Degree is a botanical support in cases of infections, elevated body temperatures and stress. The natural plant extracts in this formula are rich in phenolic compounds such as salicylates, that helps to regulate body temperatures and to relieve pain or discomfort, improving general well-being and motility of animals. 42 Degree provides electrolytes to support proper hydration of animals.' : lang === 'AZ' ? '42 Degree infeksiyalar, yüksəlmiş bədən temperaturu və stress hallarında botanik dəstəkdir. Bu formuladakı təbii bitki ekstraktları salisilat kimi fenol birləşmələrinə zəngindir, bu da bədən temperaturunu tənzimləməyə, ağrı və diskomfortu azaltmağa, heyvanların ümumi rifahını və hərəkətliliyini yaxşılaşdırmağa kömək edir. 42 Degree heyvanların düzgün hidratasiyasını dəstəkləmək üçün elektrolitlər təmin edir.' : '42 Degree является растительной поддержкой при инфекциях, повышенной температуре тела и стрессе. Натуральные растительные экстракты в этой формуле богаты фенольными соединениями, такими как салицилаты, которые помогают регулировать температуру тела и облегчать боль или дискомфорт, улучшая общее самочувствие и моторику животных. 42 Degree обеспечивает электролиты для поддержки надлежащего водного баланса.',
  benefits: lang === 'EN' ? ['Helps to fight causes and symptoms of dehydration and increased body temperatures', 'Supply of additional electrolytes', 'Helps to suppress negative vaccination reactions', 'Supports in case of pain and discomfort', 'Helps to stimulate the appetite, metabolism and digestion', 'Helping to reduce inflammation'] : lang === 'AZ' ? ['Dehidrasiya səbəbləri və əlamətləri ilə, yüksəlmiş bədən temperaturu ilə mübarizəyə kömək edir', 'Əlavə elektrolitlər təmin edir', 'Mənfi peyvənd reaksiyalarını bastırmağa kömək edir', 'Ağrı və diskomfort hallarında dəstəkləyir', 'İştahı, metabolizmi və həzmi stimullaşdırmağa kömək edir', 'İltihabı azaltmağa kömək edir'] : ['Помогает бороться с причинами и симптомами обезвоживания и повышения температуры', 'Обеспечение дополнительными электролитами', 'Помогает подавить негативные поствакцинальные реакции', 'Поддерживает при боли и дискомфорте', 'Помогает стимулировать аппетит, метаболизм и пищеварение', 'Помогает снизить воспаление'],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALAR' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml, 500 ml and 1 l bottle, 5 l and 25 l canister' : lang === 'AZ' ? '250 ml, 500 ml və 1 l şişə, 5 l və 25 l kanister' : '250 мл, 500 мл и 1 л бутылка, 5 л и 25 л канистра',
});

export default function FortyTwoDegreeModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[400] flex items-center justify-center p-4" style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,10,4,0.82)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(28,8,8,0.97) 0%, rgba(18,5,5,0.99) 100%)', border: '1px solid rgba(248,113,113,0.3)', boxShadow: '0 0 60px rgba(248,113,113,0.12), 0 40px 80px rgba(0,0,0,0.7)' }}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(248,113,113,0.18)', background: 'rgba(248,113,113,0.05)' }}>
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">42 <span style={{ color: '#f87171' }}>Degree</span></div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(248,113,113,0.55)' }}>XVET · BOTANICAL ANTIPYRETIC & ELECTROLYTES</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-wrap gap-2">{data.tags.map(tag => (<span key={tag} className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.35)', color: '#f87171' }}>{tag}</span>))}</div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex items-center justify-center rounded-2xl p-4 sm:w-56" style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(248,113,113,0.25)' }}><img src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/f962660b6_image.png" alt="42 Degree product" className="w-full object-contain" style={{ maxHeight: '180px' }} /></div>
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(248,113,113,0.6)' }}>{data.featureLabel}</div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>{data.features}</p>
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}>
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(248,113,113,0.6)' }}>{data.benefitsLabel}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{data.benefits.map(b => (<div key={b} className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#f87171' }} /><span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span></div>))}</div>
              </div>
              <div className="flex items-start gap-3"><Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(248,113,113,0.6)' }} /><div><div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(248,113,113,0.6)' }}>{data.packagingLabel}</div><span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{data.packagingDesc}</span></div></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}