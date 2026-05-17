import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const getModalData = (lang) => ({
  tags: lang === 'EN' ? ['Aromax®', 'Liquid'] : lang === 'AZ' ? ['Aromax®', 'Maye'] : ['Aromax®', 'Жидкая'],
  features: lang === 'EN'
    ? 'Aromax® is a rich synergic combination of essential oils from eucalyptus, thyme and peppermint. These oils are known to alleviate respiratory tract disturbances and to have appetizing, bioactive and insect repellent effects. Due to the essential oils inside the product, Aromax® would enhance the immunity and therefore, is a great support in severe vaccine reactions. Added L-Menthol has anti-pruritic, decongestant and cooling properties.'
    : lang === 'AZ'
    ? 'Aromax® evkalipt, kəklikotu və nanədən alınan efir yağlarının zəngin sinergik birləşməsidir. Bu yağların tənəffüs yolu pozuntularını azaltdığı, iştah açıcı, bioaktiv və həşərat uzaqlaşdırıcı təsirlərə malik olduğu bilinir. Məhsulun tərkibindəki efir yağları sayəsində Aromax® immuniteti gücləndirir və bu səbəbdən ağır peyvənd reaksiyalarında böyük dəstək rolunu oynayır. Əlavə edilmiş L-Mentol antiprüritik, ağızaçan və soyuducuedici xüsusiyyətlərə malikdir.'
    : 'Aromax® — это богатая синергетическая комбинация эфирных масел эвкалипта, тимьяна и перечной мяты. Эти масла известны своим способностью облегчать расстройства дыхательных путей, а также аппетитным, биоактивным и инсектицидным действием. Благодаря эфирным маслам в составе продукта Aromax® укрепляет иммунитет и поэтому является отличной поддержкой при тяжёлых вакцинальных реакциях. Добавленный L-ментол обладает противозудными, противоотёчными и охлаждающими свойствами.',
  tagline: lang === 'EN'
    ? 'Respiratory System Support'
    : lang === 'AZ'
    ? 'Tənəffüs Sisteminə Dəstək'
    : 'Поддержка дыхательной системы',
  taglineSubtext: lang === 'EN'
    ? 'A puff of fresh and healthy air'
    : lang === 'AZ'
    ? 'Təzə və sağlam havanın nəfəsi'
    : 'Глоток свежего и здорового воздуха',
  benefits: lang === 'EN' ? [
    'Relieves respiratory problems',
    'Helps to decrease respiratory reactions after vaccinations',
    'Gives extra comfort to livestock in cases of heat stress',
    'Improves oxygen intake and helps to support thermoregulation',
    'Enhances water and feed intake',
    'Helps to improve weight gain and feed conversion ratio',
  ] : lang === 'AZ' ? [
    'Tənəffüs problemlərini azaldır',
    'Peyvəndlərdən sonra tənəffüs reaksiyalarını azaltmağa kömək edir',
    'İstilik stresi zamanı heyvanlara əlavə rahatlıq verir',
    'Oksigen qəbulunu artırır və termorequlyasiyaya dəstəklənir',
    'Su və yem qəbulunu artırır',
    'Çəki artımını və yem çevrilmə nisbətini yaxşılaşdırmağa kömək edir',
  ] : [
    'Устраняет проблемы с дыханием',
    'Помогает снизить реакции дыхательных путей после вакцинации',
    'Обеспечивает дополнительный комфорт поголовью при тепловом стрессе',
    'Улучшает потребление кислорода и поддерживает терморегуляцию',
    'Повышает потребление воды и корма',
    'Помогает улучшить прирост живой массы и конверсию корма',
  ],
  featureLabel: lang === 'EN' ? 'FEATURES' : lang === 'AZ' ? 'XÜSUSİYYƏTLƏR' : 'ХАРАКТЕРИСТИКИ',
  benefitsLabel: lang === 'EN' ? 'BENEFITS' : lang === 'AZ' ? 'FAYDALARI' : 'ПРЕИМУЩЕСТВА',
  packagingLabel: lang === 'EN' ? 'PACKAGING' : lang === 'AZ' ? 'QABLAŞDIRMA' : 'УПАКОВКА',
  packagingDesc: lang === 'EN' ? '250 ml, 500 ml, and 1 l bottle, 5 l and 25 l canister' : lang === 'AZ' ? '250 ml, 500 ml və 1 l şişə, 5 l və 25 l kanister' : '250 мл, 500 мл и 1 л бутылка, 5 л и 25 л канистра',
});

export default function AromaxModal({ open, onClose }) {
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
              border: '1px solid rgba(56,189,248,0.3)',
              boxShadow: '0 0 60px rgba(56,189,248,0.12), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(56,189,248,0.18)',
                background: 'rgba(56,189,248,0.05)',
              }}
            >
              <div>
                <div className="font-orbitron text-lg font-bold text-white tracking-[3px]">
                  Arom<span style={{ color: '#38bdf8' }}>ax®</span>
                </div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: 'rgba(56,189,248,0.55)' }}>
                  XVET · ESSENTIAL OILS FOR RESPIRATORY SUPPORT
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
                      background: 'rgba(56,189,248,0.12)',
                      border: '1px solid rgba(56,189,248,0.35)',
                      color: '#38bdf8',
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
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(56,189,248,0.25)' }}
                >
                  <img
                    src="https://media.base44.com/images/public/69fe23b93c8a4ad0ed092450/d29ee3305_image.png"
                    alt="Aromax® product"
                    className="w-full object-contain"
                    style={{ maxHeight: '180px' }}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[4px] mb-2" style={{ color: 'rgba(56,189,248,0.6)' }}>
                    {data.featureLabel}
                  </div>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {data.features}
                  </p>
                  <div className="font-inter text-xs leading-relaxed mt-3" style={{ color: 'rgba(56,189,248,0.8)' }}>
                    <strong>{data.tagline}</strong><br />{data.taglineSubtext}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(56,189,248,0.06)',
                  border: '1px solid rgba(56,189,248,0.2)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[4px] mb-4" style={{ color: 'rgba(56,189,248,0.6)' }}>
                  {data.benefitsLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.benefits.map(b => (
                    <div key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#38bdf8' }} />
                      <span className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(56,189,248,0.6)' }} />
                <div>
                  <div className="font-mono text-[10px] tracking-[4px] mb-1" style={{ color: 'rgba(56,189,248,0.6)' }}>{data.packagingLabel}</div>
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
