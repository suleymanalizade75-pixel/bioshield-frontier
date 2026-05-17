import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Download, CheckCircle } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const COLOR = '#6B9E30';
const DATASHEET_URL = 'https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/0dd9dfad6_Product_Foudeh.pdf';

const getProducts = (lang) => [
  {
    key: 'imperial',
    name: 'IMPERIAL Calf Milk Replacer',
    tagColor: '#d4a017',
    tagline: lang === 'EN' ? '100% Animal Protein · For Dairy Calves' : lang === 'AZ' ? '100% Heyvan Zülalı · Süd Buzovları Üçün' : '100% Животный Белок · Для Молочных Телят',
    desc: lang === 'EN'
      ? 'Formulated based on the nutritional needs of dairy calves, containing 100% animal protein. Can be consumed immediately after feeding with colostrum and transition milk.'
      : lang === 'AZ'
      ? 'Süd inəklərinin buzovlarının qidalanma ehtiyaclarına əsaslanaraq 100% heyvan zülalı ilə hazırlanmışdır. Kolostrum və keçid südü ilə qidalandıqdan dərhal sonra istehlak edilə bilər.'
      : 'Сформулировано на основе потребностей в питании молочных телят, содержит 100% животного белка. Может применяться сразу после кормления молозивом и переходным молоком.',
    fortified: lang === 'EN'
      ? ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins']
      : lang === 'AZ'
      ? ['Prebiotiklər & Probiotiklər', 'B-Kompleks Vitaminlər', 'C Vitamini', 'Yağda Həll Olan Vitaminlər']
      : ['Пребиотики & Пробиотики', 'B-Комплекс Витамины', 'Витамин C', 'Жирорастворимые Витамины'],
    ingredients: lang === 'EN'
      ? 'Skimmed milk powder, whey powder, whey protein concentrate (WPC), vegetable fats, minerals and vitamins, feed additives'
      : lang === 'AZ'
      ? 'Yağsız süd tozu, zərdab tozu, zərdab zülal konsentratı (WPC), bitki yağları, minerallar və vitaminlər, yem əlavələri'
      : 'Обезжиренное молочное порошко, сывороточный порошок, концентрат сывороточного белка (WPC), растительные жиры, минералы и витамины, кормовые добавки',
    nutrients: [
      { name: lang === 'EN' ? 'Crude Protein' : lang === 'AZ' ? 'Xam Zülal' : 'Сырой Белок', value: '22 (min)', unit: '%' },
      { name: lang === 'EN' ? 'Crude Fat' : lang === 'AZ' ? 'Xam Yağ' : 'Сырой Жир', value: '17 (min)', unit: '%' },
      { name: lang === 'EN' ? 'Crude Fiber' : lang === 'AZ' ? 'Xam Lif' : 'Сырая Клетчатка', value: '0.1>', unit: '%' },
      { name: lang === 'EN' ? 'Ash' : lang === 'AZ' ? 'Kül' : 'Зола', value: '8', unit: '%' },
      { name: lang === 'EN' ? 'Calcium' : lang === 'AZ' ? 'Kalsium' : 'Кальций', value: '0.9', unit: '%' },
      { name: lang === 'EN' ? 'Phosphorus' : lang === 'AZ' ? 'Fosfor' : 'Фосфор', value: '0.6', unit: '%' },
    ],
    benefits: lang === 'EN'
      ? ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission via cow milk', 'Time-saving and easy to use', 'More economic benefits']
      : lang === 'AZ'
      ? ['Sabit və dəyişməz tərkib', 'Orta gündəlik artımın yaxşılaşdırılması', 'Yağ və zülalların sürətli həzmi', 'Əla dad keyfiyyəti və həlolma', 'Bioloji təhlükəsizlik və xəstəliklərin azaldılması', 'Vaxta qənaət edir və istifadəsi asandır', 'Daha çox iqtisadi faydalar']
      : ['Стабильный и неизменный состав', 'Улучшение среднесуточного прироста', 'Быстрое переваривание жиров и белков', 'Отличная поедаемость и растворимость', 'Биобезопасность и снижение передачи болезней', 'Экономия времени и удобство использования', 'Больше экономических выгод'],
  },
  {
    key: 'unique',
    name: 'UNIQUE Calf Milk Replacer',
    tagColor: '#2e8b57',
    tagline: lang === 'EN' ? 'Mixed Protein · Suitable from Week 3+' : lang === 'AZ' ? 'Qarışıq Zülal · 3+ Həftədən Uyğun' : 'Смешанный Белок · Подходит с 3-й Недели',
    desc: lang === 'EN'
      ? 'Formulated based on the nutritional needs of dairy calves, containing some protein of plant origin (hydrolyzed wheat gluten). Can be consumed after the end of the third week.'
      : lang === 'AZ'
      ? 'Süd inəklərinin buzovlarının qidalanma ehtiyaclarına əsaslanaraq müəyyən miqdarda bitki mənşəli zülal (hidrolizə edilmiş buğda qlüteni) ehtiva edən formul. Üçüncü həftənin sonundan sonra istehlak edilə bilər.'
      : 'Сформулировано на основе потребностей в питании молочных телят, содержит некоторое количество белков растительного происхождения (гидролизованный пшеничный глютен). Может применяться после окончания третьей недели.',
    fortified: lang === 'EN'
      ? ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins']
      : lang === 'AZ'
      ? ['Prebiotiklər & Probiotiklər', 'B-Kompleks Vitaminlər', 'C Vitamini', 'Yağda Həll Olan Vitaminlər']
      : ['Пребиотики & Пробиотики', 'B-Комплекс Витамины', 'Витамин C', 'Жирорастворимые Витамины'],
    ingredients: lang === 'EN'
      ? 'Skimmed milk powder, whey powder, whey protein concentrate (WPC), hydrolyzed wheat gluten, vegetable fats, minerals and vitamins, feed additives'
      : lang === 'AZ'
      ? 'Yağsız süd tozu, zərdab tozu, zərdab zülal konsentratı (WPC), hidrolizə edilmiş buğda qlüteni, bitki yağları, minerallar və vitaminlər, yem əlavələri'
      : 'Обезжиренное молочное порошко, сывороточный порошок, концентрат сывороточного белка (WPC), гидролизованный пшеничный глютен, растительные жиры, минералы и витамины, кормовые добавки',
    nutrients: [
      { name: lang === 'EN' ? 'Crude Protein' : lang === 'AZ' ? 'Xam Zülal' : 'Сырой Белок', value: '22 (min)', unit: '%' },
      { name: lang === 'EN' ? 'Crude Fat' : lang === 'AZ' ? 'Xam Yağ' : 'Сырой Жир', value: '17 (min)', unit: '%' },
      { name: lang === 'EN' ? 'Crude Fiber' : lang === 'AZ' ? 'Xam Lif' : 'Сырая Клетчатка', value: '0.3>', unit: '%' },
      { name: lang === 'EN' ? 'Ash' : lang === 'AZ' ? 'Kül' : 'Зола', value: '8', unit: '%' },
      { name: lang === 'EN' ? 'Calcium' : lang === 'AZ' ? 'Kalsium' : 'Кальций', value: '0.9', unit: '%' },
      { name: lang === 'EN' ? 'Phosphorus' : lang === 'AZ' ? 'Fosfor' : 'Фосфор', value: '0.6', unit: '%' },
    ],
    benefits: lang === 'EN'
      ? ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission', 'Time-saving and easy to use', 'More economic benefits']
      : lang === 'AZ'
      ? ['Sabit və dəyişməz tərkib', 'Orta gündəlik artımın yaxşılaşdırılması', 'Yağ və zülalların sürətli həzmi', 'Əla dad keyfiyyəti və həlolma', 'Bioloji təhlükəsizlik və xəstəliklərin azaldılması', 'Vaxta qənaət edir və istifadəsi asandır', 'Daha çox iqtisadi faydalar']
      : ['Стабильный и неизменный состав', 'Улучшение среднесуточного прироста', 'Быстрое переваривание жиров и белков', 'Отличная поедаемость и растворимость', 'Биобезопасность и снижение передачи болезней', 'Экономия времени и удобство использования', 'Больше экономических выгод'],
  },
  {
    key: 'freshstart',
    name: 'Fresh Start — Calcium-Energy Supplement',
    tagColor: '#e74c3c',
    tagline: lang === 'EN' ? 'For Fresh Cows · Immediately After Calving' : lang === 'AZ' ? 'Yeni Doğurmuş İnəklər Üçün · Doğumdan Dərhal Sonra' : 'Для Новотельных Коров · Сразу После Отёла',
    desc: lang === 'EN'
      ? 'A nutritious, palatable, water-soluble powder given as a drink to cows immediately after calving. Rehydrates, replenishes lost minerals, and maintains normal blood calcium. Reduces negative energy balance by stimulating dry matter intake after calving.'
      : lang === 'AZ'
      ? 'Doğumdan dərhal sonra inəklərə içki kimi verilən qidalı, dad keyfiyyətli, suda həll olan toz. Rehidratasiya edir, itirilmiş mineralları bərpa edir və normal qan kalsiumunu saxlayır. Doğumdan sonra quru maddə qəbulunu stimullaşdıraraq mənfi enerji balansını azaldır.'
      : 'Питательный, вкусный, водорастворимый порошок, даваемый коровам в виде питья сразу после отёла. Регидратирует, пополняет потерянные минералы и поддерживает нормальный кальций крови. Снижает отрицательный энергетический баланс, стимулируя потребление сухого вещества после отёла.',
    fortified: [],
    ingredients: lang === 'EN'
      ? 'Disaccharide Sugar Compounds, Hydrolyzed Wheat Protein, Glucose Precursors, Potassium Carbonate, Sodium Bicarbonate, Calcium Carbonate, Rumen-protected Choline, Chloride and Niacin, Chelated Minerals, Saccharomyces cerevisiae, Yeast cell wall, natural flavorings'
      : lang === 'AZ'
      ? 'Disakkarid Şəkər Birləşmələri, Hidrolizə edilmiş Buğda Zülalı, Qlükoza Prekursorları, Kalium Karbonat, Natrium Bikarbonat, Kalsium Karbonat, Rumenden Qorunan Xolin, Xlorid və Niasin, Xelatlı Minerallar, Saccharomyces cerevisiae, Maya hüceyrə divarı, Təbii ətirli maddələr'
      : 'Дисахаридные сахарные соединения, Гидролизованный пшеничный белок, Предшественники глюкозы, Карбонат калия, Бикарбонат натрия, Карбонат кальция, Защищённый рубцом холин, Хлорид и ниацин, Хелатные минералы, Saccharomyces cerevisiae, Клеточная стенка дрожжей, Натуральные ароматизаторы',
    nutrients: [],
    benefits: lang === 'EN'
      ? [
          'Recovers water and electrolytes lost during calving',
          'Increases dry matter intake and stimulates strong onset of lactation',
          'Provides calcium with high bioavailability in first hours post-calving',
          'Reduces risk of metritis (14% vs 18% in control)',
          'Reduces retained placenta incidence (7.9% vs 10.1%)',
          'Reduces post-partum culling (4.1% vs 6.8%)',
        ]
      : lang === 'AZ'
      ? [
          'Doğum zamanı itən su və elektrolitləri bərpa edir',
          'Quru maddə qəbulunu artırır və güclü laktasiya başlangıcını stimullaşdırır',
          'Doğumdan sonra ilk saatlarda yüksək bioloji mövcudluqla kalsium təmin edir',
          'Metrit riskini azaldır (nəzarətdə 18%-ə qarşı 14%)',
          'Saxlanılmış plasenta hallarını azaldır (10.1%-ə qarşı 7.9%)',
          'Doğum sonrası kəsilmə halllarını azaldır (6.8%-ə qarşı 4.1%)',
        ]
      : [
          'Восстанавливает воду и электролиты, потерянные при отёле',
          'Повышает потребление сухого вещества и стимулирует сильное начало лактации',
          'Обеспечивает кальций с высокой биодоступностью в первые часы после отёла',
          'Снижает риск метрита (14% против 18% в контроле)',
          'Снижает частоту задержки последа (7,9% против 10,1%)',
          'Снижает послеотёльную выбраковку (4,1% против 6,8%)',
        ],
    instructions: lang === 'EN'
      ? [
          'Add 1–1.5 kg Fresh Start to 10 liters of warm water (40–45 °C) and mix thoroughly.',
          'Once dissolved, add 10 L of cold water to reach 20 liters at 25–30 °C.',
          'Give to the cow within 30 minutes of calving and before full access to water.',
        ]
      : lang === 'AZ'
      ? [
          '10 litr isti suya (40–45 °C) 1–1,5 kq Fresh Start əlavə edin və yaxşıca qarışdırın.',
          'Həll olduqdan sonra, 25–30 °C-də 20 litrə çatmaq üçün 10 L soyuq su əlavə edin.',
          'İnəyə doğumdan 30 dəqiqə ərzində və suya tam çıxışdan əvvəl verin.',
        ]
      : [
          'Добавьте 1–1,5 кг Fresh Start в 10 литров тёплой воды (40–45 °C) и тщательно перемешайте.',
          'После растворения добавьте 10 л холодной воды до 20 литров при 25–30 °C.',
          'Дайте корове в течение 30 минут после отёла и до полного доступа к воде.',
        ],
  },
  {
    key: 'milkplus',
    name: 'Milk Plus — Milk Nutrient Enhancer',
    tagColor: '#27ae60',
    tagline: lang === 'EN' ? 'Enhancer of Milk Nutrients & Dry Matter' : lang === 'AZ' ? 'Süd Qida Maddələri & Quru Maddə Gücləndiricisi' : 'Усилитель Питательных Веществ & Сухого Вещества Молока',
    desc: lang === 'EN'
      ? 'For milk enrichment and increasing its dry matter. Formulated to meet the exact nutrient needs of calves. Mix 10 grams of powder with 1 liter of milk.'
      : lang === 'AZ'
      ? 'Südün zənginləşdirilməsi və quru maddəsinin artırılması üçün. Buzovların dəqiq qida ehtiyaclarını ödəmək üçün formul edilmişdir. 10 qram tozu 1 litr südlə qarışdırın.'
      : 'Для обогащения молока и увеличения его сухого вещества. Сформулировано для точного удовлетворения потребностей телят в питательных веществах. Смешайте 10 граммов порошка с 1 литром молока.',
    fortified: lang === 'EN'
      ? ['Pre- & Probiotics', 'Water & Fat-Soluble Vitamins', 'Major & Trace Minerals']
      : lang === 'AZ'
      ? ['Pre- & Probiotiklər', 'Suda & Yağda Həll Olan Vitaminlər', 'Əsas & İz Minerallar']
      : ['Пре- & Пробиотики', 'Водо- & Жирорастворимые Витамины', 'Макро- & Микроминералы'],
    ingredients: lang === 'EN'
      ? 'Water and Fat-soluble Vitamins, major and trace minerals, Skimmed milk powder, Whey powder'
      : lang === 'AZ'
      ? 'Suda və Yağda Həll Olan Vitaminlər, əsas və iz minerallar, Yağsız süd tozu, Zərdab tozu'
      : 'Водо- и жирорастворимые витамины, макро- и микроминералы, обезжиренное молочное порошко, сывороточный порошок',
    nutrients: [
      { name: lang === 'EN' ? 'Crude Protein' : lang === 'AZ' ? 'Xam Zülal' : 'Сырой Белок', value: '15', unit: '%' },
      { name: lang === 'EN' ? 'Crude Fat' : lang === 'AZ' ? 'Xam Yağ' : 'Сырой Жир', value: '2', unit: '%' },
      { name: lang === 'EN' ? 'Crude Fiber' : lang === 'AZ' ? 'Xam Lif' : 'Сырая Клетчатка', value: '0.1', unit: '%' },
      { name: lang === 'EN' ? 'Ash' : lang === 'AZ' ? 'Kül' : 'Зола', value: '11', unit: '%' },
      { name: lang === 'EN' ? 'Calcium' : lang === 'AZ' ? 'Kalsium' : 'Кальций', value: '1', unit: '%' },
      { name: lang === 'EN' ? 'Phosphorus' : lang === 'AZ' ? 'Fosfor' : 'Фосфор', value: '0.5', unit: '%' },
      { name: 'Vitamin A', value: '300,000', unit: 'IU/kg' },
      { name: 'Vitamin D3', value: '250,000', unit: 'IU/kg' },
      { name: 'Vitamin E', value: '20,000', unit: 'IU/kg' },
      { name: 'Vitamin C', value: '2,500', unit: 'mg/kg' },
      { name: lang === 'EN' ? 'Ferrous' : lang === 'AZ' ? 'Dəmir' : 'Железо', value: '500', unit: 'mg/kg' },
      { name: lang === 'EN' ? 'Zinc' : lang === 'AZ' ? 'Sink' : 'Цинк', value: '150', unit: 'mg/kg' },
    ],
    benefits: lang === 'EN'
      ? [
          'Fortified with pre- & probiotics improving intestinal microflora',
          'Great palatability and digestibility',
          'Increasing ingested protein and fat',
          'Shortening weaning time',
          'Improving feed conversion ratio',
          'Increasing weaning weight',
          'Excellent solubility and stability',
          'Increasing milk dry matter with the simplest way',
        ]
      : lang === 'AZ'
      ? [
          'Bağırsaq mikroflorasını yaxşılaşdıran pre- & probiotiklərlə zənginləşdirilmiş',
          'Əla dad keyfiyyəti və həzm edilebilirlik',
          'Qəbul edilən zülal və yağın artırılması',
          'Süddən keçmə vaxtının qısaldılması',
          'Yem çevrilmə nisbətinin yaxşılaşdırılması',
          'Süddən ayrılma çəkisinin artırılması',
          'Mükəmməl həlolma və sabitlik',
          'Ən sadə yolla süd quru maddəsinin artırılması',
        ]
      : [
          'Обогащён пре- & пробиотиками, улучшающими кишечную микрофлору',
          'Отличная поедаемость и усвояемость',
          'Увеличение потребляемого белка и жира',
          'Сокращение времени отлучения',
          'Улучшение коэффициента конверсии корма',
          'Увеличение веса при отлучении',
          'Отличная растворимость и стабильность',
          'Увеличение сухого вещества молока простейшим способом',
        ],
  },
  {
    key: 'novinbinder',
    name: 'Novin Binder — Mycotoxin Binder',
    tagColor: '#2980b9',
    tagline: lang === 'EN' ? 'Broad-spectrum Multi-component Detoxifier · Patented' : lang === 'AZ' ? 'Geniş Spektrli Çox Komponentli Detoksifyer · Patentli' : 'Широкоспектральный Многокомпонентный Детоксификатор · Запатентованный',
    desc: lang === 'EN'
      ? 'A broad-spectrum multi-component detoxifier supplement consisting of 5 active components with at least 3 detoxification mechanisms. Introduced by Novin Roshd Shahran Foudeh in 2019 — result of 7-year joint research. Official license from Iran Veterinary Organization (Patent No. 95355).'
      : lang === 'AZ'
      ? 'Ən az 3 detoksifikasiya mexanizmi ilə 5 aktiv komponentdən ibarət geniş spektrli çox komponentli detoksifyer əlavəsi. Novin Roshd Shahran Foudeh tərəfindən 2019-cu ildə təqdim edilmişdir — 7 illik birgə tədqiqatın nəticəsi. İran Baytarlıq Təşkilatından rəsmi lisenziya (Patent No. 95355).'
      : 'Широкоспектральная многокомпонентная детоксифицирующая добавка, состоящая из 5 активных компонентов с не менее чем 3 механизмами детоксификации. Представлена Novin Roshd Shahran Foudeh в 2019 году — результат 7-летних совместных исследований. Официальная лицензия Ветеринарной организации Ирана (Патент № 95355).',
    fortified: [],
    ingredients: lang === 'EN'
      ? 'Medicinal plants (flavonolignans, phenolic terpenes, flavonoids, phenolic acid, caffeic acids), Yeast and yeast cell wall, Thermal and acid-activated bentonite, Sodium Humate (fulvic acid, humic acid, complex organic compounds), Diatomite'
      : lang === 'AZ'
      ? 'Dərman bitkiləri (flavonolignanlar, fenol terpenler, flavonoidlər, fenol turşusu, kafein turşuları), Maya və maya hüceyrə divarı, İstilik və turşu ilə aktivləşdirilmiş bentonit, Natrium Humat (fulvik turşu, humik turşu, mürəkkəb üzvi birləşmələr), Diatomit'
      : 'Лекарственные растения (флаволигнаны, фенольные терпены, флавоноиды, фенольная кислота, кофейные кислоты), Дрожжи и клеточная стенка дрожжей, Термически и кислотно-активированный бентонит, Гумат натрия (фульвокислота, гуминовая кислота, сложные органические соединения), Диатомит',
    nutrients: [
      { name: lang === 'EN' ? 'Low contamination' : lang === 'AZ' ? 'Aşağı çirklənmə' : 'Низкое загрязнение', value: '1 kg', unit: '/ton' },
      { name: lang === 'EN' ? 'Moderate contamination' : lang === 'AZ' ? 'Orta çirklənmə' : 'Умеренное загрязнение', value: '2 kg', unit: '/ton' },
      { name: lang === 'EN' ? 'Severe contamination' : lang === 'AZ' ? 'Şiddətli çirklənmə' : 'Сильное загрязнение', value: '3 kg', unit: '/ton' },
    ],
    nutrientsLabel: lang === 'EN' ? 'RECOMMENDED DOSE' : lang === 'AZ' ? 'TÖVSİYƏ EDİLƏN DOZ' : 'РЕКОМЕНДУЕМАЯ ДОЗА',
    benefits: lang === 'EN'
      ? [
          '5 active components with various modes of action — reduces mycotoxin risk',
          'Immune system booster with antioxidant & anti-inflammatory properties',
          'Strong absorber of mycotoxins (8000:1 ratio)',
          'Strong decomposer of mycotoxins within 12 hours',
          'No significant effect on absorption of vitamins, minerals and antibiotics',
          'Improves feed efficiency and increases livestock performance',
          'Proven to clear AFB1, OTA, ZEA, and DON mycotoxins',
        ]
      : lang === 'AZ'
      ? [
          'Müxtəlif təsir mexanizmləri olan 5 aktiv komponent — mikotoksin riskini azaldır',
          'Antioksidant & antiiltihabı xüsusiyyətlərlə immun sistemi gücləndiricisi',
          'Mikotoksinlərin güclü absorbenti (8000:1 nisbət)',
          '12 saat ərzində mikotoksinlərin güclü parçalayıcısı',
          'Vitaminlərin, mineralların və antibiotiklərin udulmasına əhəmiyyətli təsiri yoxdur',
          'Yem səmərəliliyini yaxşılaşdırır və heyvandarlıq performansını artırır',
          'AFB1, OTA, ZEA və DON mikotoksinlərini təmizlədiyi sübut edilmişdir',
        ]
      : [
          '5 активных компонентов с различными механизмами действия — снижает риск микотоксинов',
          'Стимулятор иммунной системы с антиоксидантными и противовоспалительными свойствами',
          'Мощный абсорбент микотоксинов (соотношение 8000:1)',
          'Мощный разрушитель микотоксинов в течение 12 часов',
          'Не оказывает существенного влияния на усвоение витаминов, минералов и антибиотиков',
          'Улучшает эффективность кормления и повышает продуктивность животных',
          'Доказана эффективность против AFB1, OTA, ZEA и DON микотоксинов',
        ],
  },
];

const getLabels = (lang) => ({
  headerTitle: lang === 'EN' ? 'MILK REPLACERS & SUPPLEMENTS' : lang === 'AZ' ? 'SÜD ƏVƏZEDİCİLƏRİ & ƏLAVƏLƏR' : 'ЗАМЕНИТЕЛИ МОЛОКА & ДОБАВКИ',
  headerSub: lang === 'EN' ? 'CATTLE · NOVIN ROSHD SHAHRAN FOUDEH' : lang === 'AZ' ? 'MAL-QARA · NOVIN ROSHD SHAHRAN FOUDEH' : 'КРС · NOVIN ROSHD SHAHRAN FOUDEH',
  back: lang === 'EN' ? '← BACK' : lang === 'AZ' ? '← GERİ' : '← НАЗАД',
  fortifiedWith: lang === 'EN' ? 'FORTIFIED WITH' : lang === 'AZ' ? 'ZƏNGİNLƏŞDİRİLMİŞ' : 'ОБОГАЩЁН',
  guaranteedAnalysis: lang === 'EN' ? 'GUARANTEED ANALYSIS' : lang === 'AZ' ? 'ZƏMANƏT VERİLMİŞ ANALİZ' : 'ГАРАНТИРОВАННЫЙ АНАЛИЗ',
  nutrient: lang === 'EN' ? 'NUTRIENT' : lang === 'AZ' ? 'QİDA MADDƏSİ' : 'ПИТАТЕЛЬНОЕ ВЕЩЕСТВО',
  value: lang === 'EN' ? 'VALUE' : lang === 'AZ' ? 'DƏYƏR' : 'ЗНАЧЕНИЕ',
  keyBenefits: lang === 'EN' ? 'KEY BENEFITS' : lang === 'AZ' ? 'ƏSAS FAYDALARI' : 'КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА',
  instructionsForUse: lang === 'EN' ? 'INSTRUCTIONS FOR USE' : lang === 'AZ' ? 'İSTİFADƏ QAYDASI' : 'ИНСТРУКЦИЯ ПО ПРИМЕНЕНИЮ',
  ingredients: lang === 'EN' ? 'INGREDIENTS' : lang === 'AZ' ? 'TƏRKİB' : 'СОСТАВ',
  downloadDatasheet: lang === 'EN' ? 'DOWNLOAD FULL DATASHEET (PDF)' : lang === 'AZ' ? 'TAM MƏLUMAт VƏRƏQƏSİNİ YÜKLƏ (PDF)' : 'СКАЧАТЬ ПОЛНЫЙ ПАСПОРТ (PDF)',
  downloadBrochure: lang === 'EN' ? 'DOWNLOAD FULL PRODUCT BROCHURE (PDF)' : lang === 'AZ' ? 'TAM MƏHSUL BROŞURASINI YÜKLƏ (PDF)' : 'СКАЧАТЬ ПОЛНЫЙ КАТАЛОГ ПРОДУКТОВ (PDF)',
});

function ProductDetail({ product, onBack, labels }) {
  const c = product.tagColor;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="flex-1 overflow-y-auto p-6 space-y-5"
    >
      <button onClick={onBack}
        className="flex items-center gap-1 font-mono text-[9px] tracking-[2px] transition-colors mb-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'white'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
        {labels.back}
      </button>

      <div>
        <h3 className="font-orbitron text-base font-bold" style={{ color: c }}>{product.name}</h3>
        <p className="font-mono text-[9px] tracking-[2px] mt-0.5" style={{ color: `${c}88` }}>{product.tagline}</p>
      </div>

      {/* Description */}
      <div className="rounded-xl p-4" style={{ background: `${c}0d`, border: `1px solid ${c}28` }}>
        <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{product.desc}</p>
      </div>

      {/* Fortified */}
      {product.fortified.length > 0 && (
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>{labels.fortifiedWith}</p>
          <div className="flex flex-wrap gap-2">
            {product.fortified.map(f => (
              <span key={f} className="font-inter text-[10px] px-2.5 py-1 rounded-lg" style={{ background: `${c}18`, color: `${c}dd`, border: `1px solid ${c}30` }}>{f}</span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nutrients */}
        {product.nutrients.length > 0 && (
          <div>
            <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>{product.nutrientsLabel || labels.guaranteedAnalysis}</p>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${c}28` }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: `${c}18` }}>
                    <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: c }}>{labels.nutrient}</th>
                    <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: c }}>{labels.value}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.nutrients.map(({ name, value, unit }, i) => (
                    <tr key={name} style={{ background: i % 2 === 0 ? `${c}06` : 'transparent', borderTop: `1px solid ${c}10` }}>
                      <td className="px-3 py-1.5 font-inter text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{name}</td>
                      <td className="px-3 py-1.5 text-right font-bold font-orbitron text-[10px]" style={{ color: c }}>{value} <span className="font-normal text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{unit}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>{labels.keyBenefits}</p>
          <div className="space-y-1.5">
            {product.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: c }} />
                <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions (Fresh Start) */}
      {product.instructions && (
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: c }}>{labels.instructionsForUse}</p>
          <div className="space-y-1.5">
            {product.instructions.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-orbitron text-[10px] font-bold flex-shrink-0" style={{ color: c }}>{i + 1}.</span>
                <span className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients */}
      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c}20` }}>
        <p className="font-orbitron text-[9px] font-bold mb-1" style={{ color: c }}>{labels.ingredients}</p>
        <p className="font-inter text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{product.ingredients}</p>
      </div>

      {/* Download */}
      <a href={DATASHEET_URL} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all hover:opacity-80"
        style={{ color: `${c}99` }}>
        <Download className="w-3 h-3" /> {labels.downloadDatasheet}
      </a>
    </motion.div>
  );
}

export default function CattleMilkReplacersModal({ open, onClose }) {
  const { lang } = useLang();
  const PRODUCTS = getProducts(lang);
  const labels = getLabels(lang);
  const [selected, setSelected] = useState(null);

  const handleClose = () => { setSelected(null); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.88)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(6,10,4,0.97) 0%, rgba(4,7,2,0.99) 100%)',
              border: `1px solid ${COLOR}55`,
              boxShadow: `0 0 70px ${COLOR}18, 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${COLOR}22`, background: `${COLOR}09` }}>
              <div>
                <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">{labels.headerTitle}</div>
                <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${COLOR}88` }}>{labels.headerSub}</div>
              </div>
              <button onClick={handleClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {selected ? (
                <ProductDetail key={selected.key} product={selected} onBack={() => setSelected(null)} labels={labels} />
              ) : (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto p-6 space-y-3">
                  {PRODUCTS.map((product, i) => (
                    <motion.div
                      key={product.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-xl p-4 cursor-pointer"
                      style={{ background: `${product.tagColor}0d`, border: `1px solid ${product.tagColor}28` }}
                      whileHover={{ scale: 1.015, boxShadow: `0 0 24px ${product.tagColor}44`, borderColor: `${product.tagColor}60` }}
                      onClick={() => setSelected(product)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${product.tagColor}22`, border: `1px solid ${product.tagColor}40` }}>
                          <ChevronRight className="w-4 h-4" style={{ color: product.tagColor }} />
                        </div>
                        <div>
                          <div className="font-orbitron text-sm font-bold mb-0.5" style={{ color: product.tagColor }}>{product.name}</div>
                          <div className="font-mono text-[9px] tracking-[2px] mb-1" style={{ color: `${product.tagColor}88` }}>{product.tagline}</div>
                          <p className="font-inter text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{product.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="pt-2">
                    <a href={DATASHEET_URL} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all hover:opacity-80"
                      style={{ color: `${COLOR}77` }}>
                      <Download className="w-3 h-3" /> {labels.downloadBrochure}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
