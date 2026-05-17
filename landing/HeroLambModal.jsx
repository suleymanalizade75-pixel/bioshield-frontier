import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Download } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#ec4899';

const getModalData = (lang) => ({
  fortifiedLabel: lang === 'EN' ? 'FORTIFIED WITH' : lang === 'AZ' ? 'ZƏNGİNLƏŞDİRİLMİŞ' : 'ОБОГАЩЕНО',

  fortifiedItems: lang === 'EN'
    ? ['Prebiotics & Probiotics', 'Fat & Water-Soluble Vitamins', 'Trace Minerals']
    : lang === 'AZ'
    ? ['Prebiotiklər və Probiotiklər', 'Yağda və Suda Həll Olan Vitaminlər', 'İz Minerallar']
    : ['Пребиотики и Пробиотики', 'Жиро- и Водорастворимые Витамины', 'Микроэлементы'],

  lambFeedingLabel: lang === 'EN' ? 'LAMB FEEDING' : lang === 'AZ' ? 'QUZU YEMLƏMƏ' : 'КОРМЛЕНИЕ ЯГНЯТ',

  lambFeedingText: lang === 'EN'
    ? 'Newborn lambs should receive at least 210 ml of colostrum per kilogram of birth weight during the first 24 hours of life (e.g. a 4-kg lamb requires 840 ml). After sufficient colostrum, baby lambs can be fed milk replacer from day 2. The most ideal method is starting its feeding alongside ewe\'s milk.'
    : lang === 'AZ'
    ? 'Yeni doğulmuş quzular həyatının ilk 24 saatı ərzində hər kilogram doğum çəkisinə görə ən azı 210 ml ağız südü almalıdır (məsələn, 4 kq quzu 840 ml tələb edir). Kifayət qədər ağız südündən sonra körpə quzular 2-ci gündən südəvəzedici ilə qidalana bilər. Ən ideal üsul qidalandırmağa qoyun südü ilə birlikdə başlamaqdır.'
    : 'Новорождённые ягнята должны получать не менее 210 мл молозива на килограмм живой массы в первые 24 часа жизни (например, ягнёнок весом 4 кг требует 840 мл). После достаточного количества молозива ягнят можно кормить молокозаменителем со 2-го дня. Наиболее идеальный метод — начать кормление наряду с молоком овцы.',

  lambFeedingHighlight: lang === 'EN'
    ? '210 ml of colostrum per kilogram of birth weight'
    : lang === 'AZ'
    ? 'hər kilogram doğum çəkisinə görə 210 ml ağız südü'
    : '210 мл молозива на килограмм живой массы',

  analysisLabel: lang === 'EN' ? 'GUARANTEED ANALYSIS' : lang === 'AZ' ? 'ZƏMANƏTLI ANALİZ' : 'ГАРАНТИРОВАННЫЙ АНАЛИЗ',

  nutrientLabel: lang === 'EN' ? 'NUTRIENT' : lang === 'AZ' ? 'QİDA MADDƏSİ' : 'ПИТАТЕЛЬНОЕ ВЕЩЕСТВО',
  percentLabel: '%',

  nutrients: lang === 'EN'
    ? [
        { name: 'Protein', value: '24 (min)' },
        { name: 'Fat', value: '22 (min)' },
        { name: 'Crude fiber', value: '<0.15' },
        { name: 'Ash', value: '8' },
        { name: 'Calcium', value: '0.9' },
        { name: 'Phosphorus', value: '0.6' },
      ]
    : lang === 'AZ'
    ? [
        { name: 'Zülal', value: '24 (min)' },
        { name: 'Yağ', value: '22 (min)' },
        { name: 'Xam lif', value: '<0.15' },
        { name: 'Kül', value: '8' },
        { name: 'Kalsium', value: '0.9' },
        { name: 'Fosfor', value: '0.6' },
      ]
    : [
        { name: 'Протеин', value: '24 (мин)' },
        { name: 'Жир', value: '22 (мин)' },
        { name: 'Сырая клетчатка', value: '<0.15' },
        { name: 'Зола', value: '8' },
        { name: 'Кальций', value: '0.9' },
        { name: 'Фосфор', value: '0.6' },
      ],

  ingredientsLabel: lang === 'EN' ? 'INGREDIENTS' : lang === 'AZ' ? 'TƏRKİB' : 'СОСТАВ',

  ingredients: lang === 'EN'
    ? 'Skimmed milk powder, whey powder, whey protein concentrate (WPC), vegetable fats, minerals & vitamins, feed additives'
    : lang === 'AZ'
    ? 'Yağsız süd tozu, zərdab tozu, zərdab zülal konsentratı (WPC), bitki yağları, mineral və vitaminlər, yem əlavələri'
    : 'Обезжиренное сухое молоко, сухая сыворотка, концентрат сывороточного белка (WPC), растительные жиры, минералы и витамины, кормовые добавки',

  advantagesLabel: lang === 'EN' ? 'ADVANTAGES' : lang === 'AZ' ? 'ÜSTÜNLÜKLƏR' : 'ПРЕИМУЩЕСТВА',

  advantages: lang === 'EN'
    ? [
        'Dedicated formulation to meet the nutrient needs of lambs',
        'Constant and uniform composition',
        'Reduced lactose levels to improve performance and minimize occurrence of diarrhea',
        'Contains macro and trace minerals, fat-soluble vitamins, B-complex vitamins, and vitamin C',
        'Contains pro and prebiotics',
        'Completely pasteurized and free of any microbial contamination',
        'Does not contain any antibiotics',
      ]
    : lang === 'AZ'
    ? [
        'Quzuların qida ehtiyaclarını ödəmək üçün xüsusi formula',
        'Sabit və vahid kompozisiya',
        'Performansı artırmaq və ishalın baş verməsini minimuma endirmək üçün azaldılmış laktoza səviyyəsi',
        'Makro və iz minerallar, yağda həll olan vitaminlər, B-kompleks vitaminlər və C vitamini ehtiva edir',
        'Pro və prebiotiklər ehtiva edir',
        'Tamamilə pastörizasiya olunmuş və hər hansı mikrobial çirklənmədən azad',
        'Heç bir antibiotik ehtiva etmir',
      ]
    : [
        'Специальная формула для удовлетворения потребностей ягнят в питательных веществах',
        'Постоянный и однородный состав',
        'Сниженный уровень лактозы для повышения продуктивности и минимизации диареи',
        'Содержит макро- и микроэлементы, жирорастворимые витамины, витамины группы B и витамин C',
        'Содержит про- и пребиотики',
        'Полностью пастеризован и свободен от микробного загрязнения',
        'Не содержит антибиотиков',
      ],

  usesLabel: lang === 'EN' ? 'WHEN TO USE LAMB MILK REPLACER' : lang === 'AZ' ? 'QUZU SÜDÜNÜ NƏ VAXT İSTİFADƏ ETMƏLİ' : 'КОГДА ИСПОЛЬЗОВАТЬ МОЛОКОЗАМЕНИТЕЛЬ ДЛЯ ЯГНЯТ',

  uses: lang === 'EN'
    ? [
        "When ewe's milk is allocated for human consumption or industrial purposes",
        'When ewe is too young or weak to produce enough milk for feeding her lamb(s)',
        'When a lamb is not receiving enough milk from the ewe because of triplet or quadruple lambs, ewes with bad udders, or other reasons',
        'Orphan or refused lambs',
      ]
    : lang === 'AZ'
    ? [
        'Qoyun südü insan istehlakı və ya sənaye məqsədləri üçün ayrıldıqda',
        'Qoyun quzu(lar)ını qidalandırmaq üçün kifayət qədər süd istehsal etmək üçün çox gənc və ya zəif olduqda',
        'Üçlü və ya dördlü quzular, pis yelin olan qoyunlar və ya digər səbəblərdən quzu anasından kifayət qədər süd almadıqda',
        'Yetim və ya rədd edilmiş quzular',
      ]
    : [
        'Когда молоко овцы предназначено для потребления человеком или промышленных целей',
        'Когда овца слишком молода или слаба, чтобы производить достаточно молока для кормления ягнёнка',
        'Когда ягнёнок не получает достаточно молока от овцы из-за тройнёвого или четвернёвого помёта, овец с плохим выменем или других причин',
        'Осиротевшие или отвергнутые ягнята',
      ],

  mixingLabel: lang === 'EN' ? 'MIXING & FEEDING DIRECTIONS' : lang === 'AZ' ? 'QARIŞDIRMA VƏ YEMLƏMƏ TƏLİMATLARI' : 'ИНСТРУКЦИИ ПО СМЕШИВАНИЮ И КОРМЛЕНИЮ',

  mixingSteps: lang === 'EN'
    ? [
        'Mix 1 kg of milk powder into 5 liters of hot water (45–50 °C) to produce 6 liters of reconstituted milk.',
        'Pour half the water, add all the powder, stir until smooth. Add remaining water and stir again.',
        'A lamb consumes about 10% of its body weight in milk per day. Bottle temperature should be 38–40 °C.',
      ]
    : lang === 'AZ'
    ? [
        '6 litr bərpa edilmiş süd əldə etmək üçün 1 kq süd tozunu 5 litr isti suya (45–50 °C) qarışdırın.',
        'Suyun yarısını tökün, bütün tozu əlavə edin, hamar olana qədər qarışdırın. Qalan suyu əlavə edin və yenidən qarışdırın.',
        'Quzu gündəlik bədən çəkisinin təxminən 10%-ni süd kimi istehlak edir. Butulka temperaturu 38–40 °C olmalıdır.',
      ]
    : [
        'Смешайте 1 кг сухого молока в 5 литрах горячей воды (45–50 °C) для получения 6 литров восстановленного молока.',
        'Налейте половину воды, добавьте весь порошок, перемешайте до однородности. Добавьте оставшуюся воду и снова перемешайте.',
        'Ягнёнок потребляет около 10% своей массы тела в молоке в день. Температура бутылки должна быть 38–40 °C.',
      ],

  feedingChartLabel: lang === 'EN' ? 'FEEDING CHART' : lang === 'AZ' ? 'YEMLƏMƏ CƏDVƏLİ' : 'СХЕМА КОРМЛЕНИЯ',

  feedingChartHeaders: lang === 'EN'
    ? ['AGE', 'QUANTITY', 'TOTAL/DAY']
    : lang === 'AZ'
    ? ['YAŞ', 'MİQDAR', 'CƏMI/GÜN']
    : ['ВОЗРАСТ', 'КОЛИЧЕСТВО', 'ВСЕГО/ДЕНЬ'],

  feedingChart: lang === 'EN'
    ? [
        { age: 'Day 1', qty: '6×60 ml', total: '360 ml colostrum' },
        { age: 'Day 2–3', qty: '4×125 ml', total: '500 ml' },
        { age: 'Day 4–7', qty: '4×150 ml', total: '600 ml' },
        { age: 'Day 8–10', qty: '4×200 ml', total: '800 ml' },
        { age: 'Day 11–13', qty: '3×300 ml', total: '900 ml' },
        { age: 'Week 3 (from day 14)', qty: '2×600 ml', total: '1200 ml' },
        { age: 'Week 4–6', qty: '2×700 ml', total: '1400 ml' },
        { age: 'Week 7', qty: '2×500 ml', total: '1000 ml' },
        { age: 'Week 8', qty: '1×500 ml', total: '500 ml' },
      ]
    : lang === 'AZ'
    ? [
        { age: '1-ci gün', qty: '6×60 ml', total: '360 ml ağız südü' },
        { age: '2–3-cü gün', qty: '4×125 ml', total: '500 ml' },
        { age: '4–7-ci gün', qty: '4×150 ml', total: '600 ml' },
        { age: '8–10-cu gün', qty: '4×200 ml', total: '800 ml' },
        { age: '11–13-cü gün', qty: '3×300 ml', total: '900 ml' },
        { age: '3-cü həftə (14-cü gündən)', qty: '2×600 ml', total: '1200 ml' },
        { age: '4–6-cı həftə', qty: '2×700 ml', total: '1400 ml' },
        { age: '7-ci həftə', qty: '2×500 ml', total: '1000 ml' },
        { age: '8-ci həftə', qty: '1×500 ml', total: '500 ml' },
      ]
    : [
        { age: '1-й день', qty: '6×60 мл', total: '360 мл молозива' },
        { age: '2–3-й день', qty: '4×125 мл', total: '500 мл' },
        { age: '4–7-й день', qty: '4×150 мл', total: '600 мл' },
        { age: '8–10-й день', qty: '4×200 мл', total: '800 мл' },
        { age: '11–13-й день', qty: '3×300 мл', total: '900 мл' },
        { age: '3-я неделя (с 14-го дня)', qty: '2×600 мл', total: '1200 мл' },
        { age: '4–6-я неделя', qty: '2×700 мл', total: '1400 мл' },
        { age: '7-я неделя', qty: '2×500 мл', total: '1000 мл' },
        { age: '8-я неделя', qty: '1×500 мл', total: '500 мл' },
      ],

  downloadLabel: lang === 'EN' ? 'DOWNLOAD PRODUCT DATASHEET (PDF)' : lang === 'AZ' ? 'MƏHSUL MƏLUMAT SƏHİFƏSİNİ YÜKLƏ (PDF)' : 'СКАЧАТЬ ТЕХНИЧЕСКОЕ ОПИСАНИЕ (PDF)',
});

export default function HeroLambModal({ open, onClose }) {
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
              background: 'linear-gradient(145deg, rgba(12,4,8,0.98) 0%, rgba(8,2,6,0.99) 100%)',
              border: `1px solid ${COLOR}55`,
              boxShadow: `0 0 70px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}>
              <div>
                <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">HERO<sup className="text-[9px]" style={{ color: COLOR }}>®</sup> Lamb Milk Replacer</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>NOVIN ROSHD SHAHRAN FOUDEH · FOR LAMBS</div>
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
                <p className="font-orbitron text-xs font-bold mb-1" style={{ color: COLOR }}>{data.fortifiedLabel}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.fortifiedItems.map(f => (
                    <span key={f} className="font-inter text-[11px] px-2 py-1 rounded-lg" style={{ background: `${COLOR}18`, color: `${COLOR}dd`, border: `1px solid ${COLOR}30` }}>{f}</span>
                  ))}
                </div>
              </motion.div>

              {/* Lamb Feeding Info */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.lambFeedingLabel}</p>
                <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {lang === 'EN' ? (
                    <>Newborn lambs should receive at least <strong style={{ color: 'rgba(255,255,255,0.85)' }}>210 ml of colostrum per kilogram of birth weight</strong> during the first 24 hours of life (e.g. a 4-kg lamb requires 840 ml). After sufficient colostrum, baby lambs can be fed milk replacer from day 2. The most ideal method is starting its feeding alongside ewe's milk.</>
                  ) : lang === 'AZ' ? (
                    <>Yeni doğulmuş quzular həyatının ilk 24 saatı ərzində <strong style={{ color: 'rgba(255,255,255,0.85)' }}>hər kilogram doğum çəkisinə görə ən azı 210 ml ağız südü</strong> almalıdır (məsələn, 4 kq quzu 840 ml tələb edir). Kifayət qədər ağız südündən sonra körpə quzular 2-ci gündən südəvəzedici ilə qidalana bilər. Ən ideal üsul qidalandırmağa qoyun südü ilə birlikdə başlamaqdır.</>
                  ) : (
                    <>Новорождённые ягнята должны получать не менее <strong style={{ color: 'rgba(255,255,255,0.85)' }}>210 мл молозива на килограмм живой массы</strong> в первые 24 часа жизни (например, ягнёнок весом 4 кг требует 840 мл). После достаточного количества молозива ягнят можно кормить молокозаменителем со 2-го дня. Наиболее идеальный метод — начать кормление наряду с молоком овцы.</>
                  )}
                </p>
              </motion.div>

              {/* Guaranteed Analysis + Advantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.analysisLabel}</p>
                  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: `${COLOR}18` }}>
                          <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: COLOR }}>{data.nutrientLabel}</th>
                          <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: COLOR }}>{data.percentLabel}</th>
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
                  <div className="mt-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}20` }}>
                    <p className="font-orbitron text-[9px] font-bold mb-1.5" style={{ color: COLOR }}>{data.ingredientsLabel}</p>
                    <p className="font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{data.ingredients}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
                  <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.advantagesLabel}</p>
                  <div className="space-y-1.5">
                    {data.advantages.map((a, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: COLOR }} />
                        <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Uses */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.usesLabel}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.uses.map((u, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg p-2.5" style={{ background: `${COLOR}08`, border: `1px solid ${COLOR}20` }}>
                      <span style={{ color: COLOR }} className="flex-shrink-0 mt-0.5 text-xs">▸</span>
                      <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{u}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mixing directions */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}
                className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLOR}25` }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.mixingLabel}</p>
                <ul className="space-y-1.5">
                  {data.mixingSteps.map((step, i) => (
                    <li key={i} className="font-inter text-xs flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <span style={{ color: COLOR }}>{i + 1}.</span> {step}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Feeding chart */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
                <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: COLOR }}>{data.feedingChartLabel}</p>
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLOR}28` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: `${COLOR}18` }}>
                        {data.feedingChartHeaders.map(h => (
                          <th key={h} className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: COLOR }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.feedingChart.map(({ age, qty, total }, i) => (
                        <tr key={age} style={{ background: i % 2 === 0 ? `${COLOR}06` : 'transparent', borderTop: `1px solid ${COLOR}10` }}>
                          <td className="px-3 py-2 font-orbitron text-[10px] font-bold" style={{ color: COLOR }}>{age}</td>
                          <td className="px-3 py-2 font-inter" style={{ color: 'rgba(255,255,255,0.6)' }}>{qty}</td>
                          <td className="px-3 py-2 font-inter" style={{ color: 'rgba(255,255,255,0.5)' }}>{total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Download */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}>
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
