import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Download } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#f59e0b';

const getModalData = (lang) => ({
  fortifiedLabel: lang === 'EN' ? 'FORTIFIED WITH' : lang === 'AZ' ? 'ZƏNGİNLƏŞDİRİLMİŞ' : 'ОБОГАЩЕНО',

  fortifiedItems: lang === 'EN'
    ? ['Prebiotics & Probiotics', 'Fat & Water-Soluble Vitamins', 'Trace Minerals']
    : lang === 'AZ'
    ? ['Prebiotiklər və Probiotiklər', 'Yağda və Suda Həll Olan Vitaminlər', 'İz Minerallar']
    : ['Пребиотики и Пробиотики', 'Жиро- и Водорастворимые Витамины', 'Микроэлементы'],

  analysisLabel: lang === 'EN' ? 'GUARANTEED ANALYSIS' : lang === 'AZ' ? 'ZƏMANƏTLI ANALİZ' : 'ГАРАНТИРОВАННЫЙ АНАЛИЗ',

  nutrientLabel: lang === 'EN' ? 'NUTRIENT' : lang === 'AZ' ? 'QİDA MADDƏSİ' : 'ПИТАТЕЛЬНОЕ ВЕЩЕСТВО',
  valueLabel: lang === 'EN' ? 'VALUE' : lang === 'AZ' ? 'DƏYƏR' : 'ЗНАЧЕНИЕ',

  nutrients: lang === 'EN'
    ? [
        { name: 'Crude protein, min', value: '24%' },
        { name: 'Crude fat, min', value: '20%' },
        { name: 'Crude fiber, max', value: '0.1%' },
        { name: 'Calcium, min', value: '0.9%' },
        { name: 'Phosphorus, min', value: '0.6%' },
        { name: 'Ash', value: '7.2%' },
      ]
    : lang === 'AZ'
    ? [
        { name: 'Xam zülal, min', value: '24%' },
        { name: 'Xam yağ, min', value: '20%' },
        { name: 'Xam lif, maks', value: '0.1%' },
        { name: 'Kalsium, min', value: '0.9%' },
        { name: 'Fosfor, min', value: '0.6%' },
        { name: 'Kül', value: '7.2%' },
      ]
    : [
        { name: 'Сырой протеин, мин', value: '24%' },
        { name: 'Сырой жир, мин', value: '20%' },
        { name: 'Сырая клетчатка, макс', value: '0.1%' },
        { name: 'Кальций, мин', value: '0.9%' },
        { name: 'Фосфор, мин', value: '0.6%' },
        { name: 'Зола', value: '7.2%' },
      ],

  ingredientsLabel: lang === 'EN' ? 'INGREDIENTS' : lang === 'AZ' ? 'TƏRKİB' : 'СОСТАВ',

  ingredients: lang === 'EN'
    ? 'Skim milk powder, whey powder, whey protein concentrate (WPC), vegetable oils, minerals and vitamins, pre & probiotics'
    : lang === 'AZ'
    ? 'Yağsız süd tozu, zərdab tozu, zərdab zülal konsentratı (WPC), bitki yağları, mineral və vitaminlər, pre və probiotiklər'
    : 'Обезжиренное сухое молоко, сухая сыворотка, концентрат сывороточного белка (WPC), растительные масла, минералы и витамины, пре- и пробиотики',

  mixingLabel: lang === 'EN' ? 'MIXING & FEEDING DIRECTIONS' : lang === 'AZ' ? 'QARIŞDIRMA VƏ YEMLƏMƏ TƏLİMATLARI' : 'ИНСТРУКЦИИ ПО СМЕШИВАНИЮ И КОРМЛЕНИЮ',

  mixingSteps: lang === 'EN'
    ? [
        '▸ Mix 1 kg of milk powder into 6 L of hot water (50 °C) to produce 7 L of reconstituted milk.',
        '▸ Distribute at 42 °C for kids.',
      ]
    : lang === 'AZ'
    ? [
        '▸ 7 L bərpa edilmiş süd əldə etmək üçün 1 kq süd tozunu 6 L isti suya (50 °C) qarışdırın.',
        '▸ Oğlaqlar üçün 42 °C-də paylaşdırın.',
      ]
    : [
        '▸ Смешайте 1 кг сухого молока в 6 л горячей воды (50 °C) для получения 7 л восстановленного молока.',
        '▸ Раздавайте при 42 °C для козлят.',
      ],

  benefitsLabel: lang === 'EN' ? 'KEY BENEFITS' : lang === 'AZ' ? 'ƏSAS FAYDALARI' : 'КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА',

  benefits: lang === 'EN'
    ? [
        'Made of the finest and highest quality raw materials',
        'Special formulation for providing maximum health and growth',
        'High palatability',
        'High solubility, even in cold water',
        'High digestibility and balanced fat and protein content',
        'Use of probiotics and prebiotics to support gastrointestinal tract function',
        'Easy and time-saving preparation',
        'High economic efficiency',
        'Reduce disease transmission through goat milk consumption',
        'Pasteurized and free of any microbial contamination',
        'Excellent for use in automatic machines',
      ]
    : lang === 'AZ'
    ? [
        'Ən yaxşı və ən yüksək keyfiyyətli xammaldan hazırlanmışdır',
        'Maksimum sağlamlıq və böyümə üçün xüsusi formula',
        'Yüksək yeyilmə dərəcəsi',
        'Soyuq suda belə yüksək həlledicilik',
        'Yüksək həzmolunma və balanslaşdırılmış yağ və zülal tərkibi',
        'Mədə-bağırsaq traktının funksiyasını dəstəkləmək üçün probiotik və prebiotiklərin istifadəsi',
        'Asan və vaxt qənaət edən hazırlanma',
        'Yüksək iqtisadi səmərəlilik',
        'Keçi südü istehlakı yolu ilə xəstəlik ötürülməsini azaldır',
        'Pastörizasiya olunmuş və hər hansı mikrobial çirklənmədən azad',
        'Avtomatik maşınlarda istifadə üçün əla',
      ]
    : [
        'Изготовлен из лучшего сырья высочайшего качества',
        'Специальная формула для обеспечения максимального здоровья и роста',
        'Высокая поедаемость',
        'Высокая растворимость даже в холодной воде',
        'Высокая усвояемость и сбалансированное содержание жира и белка',
        'Использование про- и пребиотиков для поддержки функции ЖКТ',
        'Простое и экономящее время приготовление',
        'Высокая экономическая эффективность',
        'Снижение передачи болезней через потребление козьего молока',
        'Пастеризован и свободен от микробного загрязнения',
        'Отлично подходит для использования в автоматических машинах',
      ],

  downloadLabel: lang === 'EN' ? 'DOWNLOAD PRODUCT DATASHEET (PDF)' : lang === 'AZ' ? 'MƏHSUL MƏLUMAT SƏHİFƏSİNİ YÜKLƏ (PDF)' : 'СКАЧАТЬ ТЕХНИЧЕСКОЕ ОПИСАНИЕ (PDF)',
});

export default function GoldenKidModal({ open, onClose }) {
  const { lang } = useLang();
  const data = getModalData(lang);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[600] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.92)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(10,8,2,0.98) 0%, rgba(8,6,0,0.99) 100%)',
              border: `1px solid ${COLOR}55`,
              boxShadow: `0 0 70px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}>
              <div>
                <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">GOLDEN Kid Milk Replacer</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>NOVIN ROSHD SHAHRAN FOUDEH · FOR GOAT KIDS</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Fortified with */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="rounded-xl p-4" style={{ background: `${COLOR}0d`, border: `1px solid ${COLOR}28` }}>
                <p className="font-orbitron text-xs font-bold mb-2" style={{ color: COLOR }}>{data.fortifiedLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {data.fortifiedItems.map(f => (
                    <span key={f} className="font-inter text-[11px] px-2.5 py-1 rounded-lg" style={{ background: `${COLOR}18`, color: `${COLOR}dd`, border: `1px solid ${COLOR}30` }}>{f}</span>
                  ))}
                </div>
              </motion.div>

              {/* Analysis + Ingredients side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.analysisLabel}</p>
                  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: `${COLOR}18` }}>
                          <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: COLOR }}>{data.nutrientLabel}</th>
                          <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: COLOR }}>{data.valueLabel}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.nutrients.map(({ name, value }, i) => (
                          <tr key={name} style={{ background: i % 2 === 0 ? `${COLOR}06` : 'transparent', borderTop: `1px solid ${COLOR}10` }}>
                            <td className="px-3 py-2 font-inter" style={{ color: 'rgba(255,255,255,0.6)' }}>{name}</td>
                            <td className="px-3 py-2 text-right font-bold font-orbitron text-[11px]" style={{ color: COLOR }}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.ingredientsLabel}</p>
                  <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}20` }}>
                    <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {data.ingredients}
                    </p>
                  </div>

                  <div className="mt-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}20` }}>
                    <p className="font-orbitron text-[9px] font-bold mb-1.5" style={{ color: COLOR }}>{data.mixingLabel}</p>
                    <ul className="space-y-1">
                      {data.mixingSteps.map((step, i) => (
                        <li key={i} className="font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Benefits */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}>
                <p className="font-orbitron text-[10px] font-bold mb-3" style={{ color: COLOR }}>{data.benefitsLabel}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: COLOR }} />
                      <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Download */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
                <a href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/0dd9dfad6_Product_Foudeh.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all hover:opacity-80"
                  style={{ color: `${COLOR}99` }}>
                  <Download className="w-3 h-3" /> {data.downloadLabel}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
