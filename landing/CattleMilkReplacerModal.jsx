import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BookOpen, Zap, ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const BRAND_COLOR = '#38bdf8';

const getProducts = (lang) => [
  {
    key: 'imperial',
    name: 'IMPERIAL Calf Milk Replacer',
    color: '#f59e0b',
    tagline: lang === 'EN' ? '100% Animal Protein · Premium Formulation' : lang === 'AZ' ? '100% Heyvan Zülalı · Premium Formul' : '100% Животный Белок · Премиум Формула',
    description: lang === 'EN'
      ? 'Formulated based on the nutritional needs of dairy calves, containing 100% animal protein. Can be consumed immediately after feeding with colostrum and transition milk. Delivers stable and unchanged composition for consistent calf development.'
      : lang === 'AZ'
      ? 'Süd inəklərinin buzovlarının qidalanma ehtiyaclarına əsaslanaraq 100% heyvan zülalı ilə hazırlanmışdır. Kolostrum və keçid südü ilə qidalandıqdan dərhal sonra istehlak edilə bilər. Buzovların ardıcıl inkişafı üçün sabit və dəyişməz tərkib təqdim edir.'
      : 'Сформулировано на основе потребностей в питании молочных телят, содержит 100% животного белка. Может применяться сразу после кормления молозивом и переходным молоком. Обеспечивает стабильный и неизменный состав для последовательного развития телят.',
    fortified: lang === 'EN'
      ? ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins']
      : lang === 'AZ'
      ? ['Prebiotiklər & Probiotiklər', 'B-Kompleks Vitaminlər', 'C Vitamini', 'Yağda Həll Olan Vitaminlər']
      : ['Пребиотики & Пробиотики', 'B-Комплекс Витамины', 'Витамин C', 'Жирорастворимые Витамины'],
    ingredients: lang === 'EN'
      ? ['Skimmed milk powder', 'Whey powder', 'Whey protein concentrate (WPC)', 'Vegetable fats', 'Minerals and Vitamins', 'Feed additives']
      : lang === 'AZ'
      ? ['Yağsız süd tozu', 'Zərdab tozu', 'Zərdab zülal konsentratı (WPC)', 'Bitki yağları', 'Minerallar və Vitaminlər', 'Yem əlavələri']
      : ['Обезжиренное молочное порошко', 'Сывороточный порошок', 'Концентрат сывороточного белка (WPC)', 'Растительные жиры', 'Минералы и Витамины', 'Кормовые добавки'],
    analysis: [
      { nutrient: lang === 'EN' ? 'Crude Protein' : lang === 'AZ' ? 'Xam Zülal' : 'Сырой Белок', value: '22 (min)', unit: '%' },
      { nutrient: lang === 'EN' ? 'Crude Fat' : lang === 'AZ' ? 'Xam Yağ' : 'Сырой Жир', value: '17 (min)', unit: '%' },
      { nutrient: lang === 'EN' ? 'Crude Fiber' : lang === 'AZ' ? 'Xam Lif' : 'Сырая Клетчатка', value: '0.1>', unit: '%' },
      { nutrient: lang === 'EN' ? 'Ash' : lang === 'AZ' ? 'Kül' : 'Зола', value: '8', unit: '%' },
      { nutrient: lang === 'EN' ? 'Calcium' : lang === 'AZ' ? 'Kalsium' : 'Кальций', value: '0.9', unit: '%' },
      { nutrient: lang === 'EN' ? 'Phosphorus' : lang === 'AZ' ? 'Fosfor' : 'Фосфор', value: '0.6', unit: '%' },
    ],
    benefits: lang === 'EN'
      ? ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission via cow milk', 'Time-saving and easy to use', 'More economic benefits']
      : lang === 'AZ'
      ? ['Sabit və dəyişməz tərkib', 'Orta gündəlik artımın yaxşılaşdırılması', 'Yağ və zülalların sürətli həzmi', 'Əla dad keyfiyyəti və həlolma', 'Bioloji təhlükəsizlik və inək südü ilə xəstəliklərin ötürülməsinin azaldılması', 'Vaxta qənaət edir və istifadəsi asandır', 'Daha çox iqtisadi faydalar']
      : ['Стабильный и неизменный состав', 'Улучшение среднесуточного прироста', 'Быстрое переваривание жиров и белков', 'Отличная поедаемость и растворимость', 'Биобезопасность и снижение передачи болезней через коровье молоко', 'Экономия времени и удобство использования', 'Больше экономических выгод'],
  },
  {
    key: 'unique',
    name: 'UNIQUE Calf Milk Replacer',
    color: '#34d399',
    tagline: lang === 'EN' ? 'Animal & Plant Protein Blend · Cost-Effective' : lang === 'AZ' ? 'Heyvan & Bitki Zülal Qarışığı · Sərfəli' : 'Смесь Животного & Растительного Белка · Экономичный',
    description: lang === 'EN'
      ? 'Formulated based on the nutritional needs of dairy calves, containing some protein of plant origin. Can be consumed after the end of the third week. Includes hydrolyzed wheat gluten for improved digestibility and feed conversion.'
      : lang === 'AZ'
      ? 'Süd inəklərinin buzovlarının qidalanma ehtiyaclarına əsaslanaraq müəyyən miqdarda bitki mənşəli zülal ehtiva edən formul. Üçüncü həftənin sonundan sonra istehlak edilə bilər. Həzmi və yem çevrilməsini yaxşılaşdırmaq üçün hidrolizə edilmiş buğda qlütenini ehtiva edir.'
      : 'Сформулировано на основе потребностей в питании молочных телят, содержит некоторое количество белков растительного происхождения. Может применяться после окончания третьей недели. Включает гидролизованный пшеничный глютен для улучшения усвояемости и конверсии корма.',
    fortified: lang === 'EN'
      ? ['Prebiotics & Probiotics', 'B-Complex Vitamins', 'Vitamin C', 'Fat-Soluble Vitamins']
      : lang === 'AZ'
      ? ['Prebiotiklər & Probiotiklər', 'B-Kompleks Vitaminlər', 'C Vitamini', 'Yağda Həll Olan Vitaminlər']
      : ['Пребиотики & Пробиотики', 'B-Комплекс Витамины', 'Витамин C', 'Жирорастворимые Витамины'],
    ingredients: lang === 'EN'
      ? ['Skimmed milk powder', 'Whey powder', 'Whey protein concentrate (WPC)', 'Hydrolyzed wheat gluten', 'Vegetable fats', 'Minerals and Vitamins', 'Feed additives']
      : lang === 'AZ'
      ? ['Yağsız süd tozu', 'Zərdab tozu', 'Zərdab zülal konsentratı (WPC)', 'Hidrolizə edilmiş buğda qlüteni', 'Bitki yağları', 'Minerallar və Vitaminlər', 'Yem əlavələri']
      : ['Обезжиренное молочное порошко', 'Сывороточный порошок', 'Концентрат сывороточного белка (WPC)', 'Гидролизованный пшеничный глютен', 'Растительные жиры', 'Минералы и Витамины', 'Кормовые добавки'],
    analysis: [
      { nutrient: lang === 'EN' ? 'Crude Protein' : lang === 'AZ' ? 'Xam Zülal' : 'Сырой Белок', value: '22 (min)', unit: '%' },
      { nutrient: lang === 'EN' ? 'Crude Fat' : lang === 'AZ' ? 'Xam Yağ' : 'Сырой Жир', value: '17 (min)', unit: '%' },
      { nutrient: lang === 'EN' ? 'Crude Fiber' : lang === 'AZ' ? 'Xam Lif' : 'Сырая Клетчатка', value: '0.3>', unit: '%' },
      { nutrient: lang === 'EN' ? 'Ash' : lang === 'AZ' ? 'Kül' : 'Зола', value: '8', unit: '%' },
      { nutrient: lang === 'EN' ? 'Calcium' : lang === 'AZ' ? 'Kalsium' : 'Кальций', value: '0.9', unit: '%' },
      { nutrient: lang === 'EN' ? 'Phosphorus' : lang === 'AZ' ? 'Fosfor' : 'Фосфор', value: '0.6', unit: '%' },
    ],
    benefits: lang === 'EN'
      ? ['Stable and unchanged composition', 'Improving average daily gain', 'Rapid digestion of fats and proteins', 'Great palatability and solubility', 'Biosecurity and reduced disease transmission via cow milk', 'Time-saving and easy to use', 'More economic benefits']
      : lang === 'AZ'
      ? ['Sabit və dəyişməz tərkib', 'Orta gündəlik artımın yaxşılaşdırılması', 'Yağ və zülalların sürətli həzmi', 'Əla dad keyfiyyəti və həlolma', 'Bioloji təhlükəsizlik və inək südü ilə xəstəliklərin ötürülməsinin azaldılması', 'Vaxta qənaət edir və istifadəsi asandır', 'Daha çox iqtisadi faydalar']
      : ['Стабильный и неизменный состав', 'Улучшение среднесуточного прироста', 'Быстрое переваривание жиров и белков', 'Отличная поедаемость и растворимость', 'Биобезопасность и снижение передачи болезней через коровье молоко', 'Экономия времени и удобство использования', 'Больше экономических выгод'],
  },
  {
    key: 'milk-plus',
    name: 'Milk Plus',
    color: '#a78bfa',
    tagline: lang === 'EN' ? 'Enhancer of Milk Nutrients & Dry Matter' : lang === 'AZ' ? 'Süd Qida Maddələri & Quru Maddə Gücləndiricisi' : 'Усилитель Питательных Веществ & Сухого Вещества Молока',
    description: lang === 'EN'
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
      ? ['Water and Fat-soluble Vitamins', 'Major and trace minerals', 'Skimmed milk powder', 'Whey powder']
      : lang === 'AZ'
      ? ['Suda və Yağda Həll Olan Vitaminlər', 'Əsas və iz minerallar', 'Yağsız süd tozu', 'Zərdab tozu']
      : ['Водо- и жирорастворимые витамины', 'Макро- и микроминералы', 'Обезжиренное молочное порошко', 'Сывороточный порошок'],
    analysis: [
      { nutrient: lang === 'EN' ? 'Crude protein' : lang === 'AZ' ? 'Xam zülal' : 'Сырой белок', value: '15', unit: '%' },
      { nutrient: lang === 'EN' ? 'Crude fat' : lang === 'AZ' ? 'Xam yağ' : 'Сырой жир', value: '2', unit: '%' },
      { nutrient: lang === 'EN' ? 'Crude fiber' : lang === 'AZ' ? 'Xam lif' : 'Сырая клетчатка', value: '0.1', unit: '%' },
      { nutrient: lang === 'EN' ? 'Ash' : lang === 'AZ' ? 'Kül' : 'Зола', value: '11', unit: '%' },
      { nutrient: lang === 'EN' ? 'Calcium' : lang === 'AZ' ? 'Kalsium' : 'Кальций', value: '1', unit: '%' },
      { nutrient: lang === 'EN' ? 'Phosphorus' : lang === 'AZ' ? 'Fosfor' : 'Фосфор', value: '0.5', unit: '%' },
      { nutrient: 'Vitamin A', value: '300,000', unit: 'IU/kg' },
      { nutrient: 'Vitamin D3', value: '250,000', unit: 'IU/kg' },
      { nutrient: 'Vitamin E', value: '20,000', unit: 'IU/kg' },
      { nutrient: 'Vitamin C', value: '2,500', unit: 'mg/kg' },
      { nutrient: lang === 'EN' ? 'Zinc' : lang === 'AZ' ? 'Sink' : 'Цинк', value: '150', unit: 'mg/kg' },
      { nutrient: lang === 'EN' ? 'Iron' : lang === 'AZ' ? 'Dəmir' : 'Железо', value: '500', unit: 'mg/kg' },
    ],
    benefits: lang === 'EN'
      ? ['Fortified with pre- & probiotics for intestinal microflora', 'Great palatability and digestibility', 'Increasing ingested protein and fat', 'Shortening weaning time', 'Improving feed conversion ratio', 'Increasing weaning weight', 'Excellent solubility and stability', 'Increasing milk dry matter with the simplest way']
      : lang === 'AZ'
      ? ['Bağırsaq mikroflorası üçün pre- & probiotiklərlə zənginləşdirilmiş', 'Əla dad keyfiyyəti və həzm edilebilirlik', 'Qəbul edilən zülal və yağın artırılması', 'Süddən keçmə vaxtının qısaldılması', 'Yem çevrilmə nisbətinin yaxşılaşdırılması', 'Süddən ayrılma çəkisinin artırılması', 'Mükəmməl həlolma və sabitlik', 'Ən sadə yolla süd quru maddəsinin artırılması']
      : ['Обогащён пре- & пробиотиками для кишечной микрофлоры', 'Отличная поедаемость и усвояемость', 'Увеличение потребляемого белка и жира', 'Сокращение времени отлучения от матери', 'Улучшение коэффициента конверсии корма', 'Увеличение веса при отлучении', 'Отличная растворимость и стабильность', 'Увеличение сухого вещества молока простейшим способом'],
  },
  {
    key: 'fresh-start',
    name: 'Fresh Start',
    color: '#f87171',
    tagline: lang === 'EN' ? 'Calcium-Energy Supplement Drink for Fresh Cows' : lang === 'AZ' ? 'Yeni Doğurmuş İnəklər üçün Kalsium-Enerji Əlavə İçkisi' : 'Кальций-Энергетический Добавочный Напиток для Новотельных Коров',
    description: lang === 'EN'
      ? 'A nutritious, palatable, water-soluble powder given as a drink to cows immediately after calving. Rehydrates the cow, replenishes lost mineral resources, and maintains normal blood calcium levels. Reduces the intensity of negative energy balance by stimulating dry matter intake after calving.'
      : lang === 'AZ'
      ? 'Doğumdan dərhal sonra inəklərə içki kimi verilən qidalı, dad keyfiyyətli, suda həll olan toz. İnəyi rehidratasiya edir, itirilmiş mineral ehtiyatlarını bərpa edir və normal qan kalsium səviyyəsini saxlayır. Doğumdan sonra quru maddə qəbulunu stimullaşdıraraq mənfi enerji balansının intensivliyini azaldır.'
      : 'Питательный, вкусный, водорастворимый порошок, даваемый коровам в виде питья сразу после отела. Регидратирует корову, пополняет потерянные минеральные ресурсы и поддерживает нормальный уровень кальция в крови. Снижает интенсивность отрицательного энергетического баланса, стимулируя потребление сухого вещества после отела.',
    fortified: lang === 'EN'
      ? ['Calcium Carbonate', 'Rumen-Protected Choline', 'Saccharomyces cerevisiae', 'Glucose Precursors', 'Chelated Minerals']
      : lang === 'AZ'
      ? ['Kalsium Karbonat', 'Rumenden Qorunan Xolin', 'Saccharomyces cerevisiae', 'Qlükoza Prekursorları', 'Xelatlı Minerallar']
      : ['Карбонат Кальция', 'Защищённый Рубцом Холин', 'Saccharomyces cerevisiae', 'Предшественники Глюкозы', 'Хелатные Минералы'],
    ingredients: lang === 'EN'
      ? ['Disaccharide Sugar Compounds', 'Hydrolyzed Wheat Protein', 'Glucose Precursors', 'Potassium Carbonate', 'Sodium bicarbonate', 'Calcium Carbonate', 'Rumen-protected Choline', 'Chloride and Niacin', 'Chelated Minerals', 'Saccharomyces cerevisiae', 'Yeast cell wall', 'Natural flavorings']
      : lang === 'AZ'
      ? ['Disakkarid Şəkər Birləşmələri', 'Hidrolizə edilmiş Buğda Zülalı', 'Qlükoza Prekursorları', 'Kalium Karbonat', 'Natrium Bikarbonat', 'Kalsium Karbonat', 'Rumenden Qorunan Xolin', 'Xlorid və Niasin', 'Xelatlı Minerallar', 'Saccharomyces cerevisiae', 'Maya hüceyrə divarı', 'Təbii ətirli maddələr']
      : ['Дисахаридные Сахарные Соединения', 'Гидролизованный Пшеничный Белок', 'Предшественники Глюкозы', 'Карбонат Калия', 'Бикарбонат Натрия', 'Карбонат Кальция', 'Защищённый Рубцом Холин', 'Хлорид и Ниацин', 'Хелатные Минералы', 'Saccharomyces cerevisiae', 'Клеточная стенка дрожжей', 'Натуральные ароматизаторы'],
    analysis: [],
    benefits: lang === 'EN'
      ? [
          'Recovery of water and electrolytes after calving',
          'Stimulates dry matter intake to reduce negative energy balance',
          'Provides calcium with high bioavailability in the critical first hours after calving',
          'Supports strong onset of lactation with readily available sugars',
          'Reduces risk of metritis, retained placenta, and postpartum culling',
          'Pleasant taste encourages the cow to drink more water',
        ]
      : lang === 'AZ'
      ? [
          'Doğumdan sonra su və elektrolitlərin bərpası',
          'Mənfi enerji balansını azaltmaq üçün quru maddə qəbulunu stimullaşdırır',
          'Doğumdan sonra kritik ilk saatlarda yüksək bioloji mövcudluqla kalsium təmin edir',
          'Hazır şəkər ilə güclü laktasiya başlangıcını dəstəkləyir',
          'Metrit, saxlanılmış plasentanın riskini azaldır',
          'Xoş dad inəyi daha çox su içməyə həvəsləndirir',
        ]
      : [
          'Восстановление воды и электролитов после отёла',
          'Стимулирует потребление сухого вещества для снижения отрицательного энергетического баланса',
          'Обеспечивает кальций с высокой биодоступностью в критические первые часы после отёла',
          'Поддерживает сильное начало лактации с легко доступными сахарами',
          'Снижает риск метрита, задержки последа и выбраковки после отёла',
          'Приятный вкус побуждает корову пить больше воды',
        ],
    usage: lang === 'EN'
      ? '1–1.5 kg per animal in 10 liters of warm water (40–45°C). Once dissolved, add 10 L cold water to reach 20 liters at 25–30°C. Give within 30 minutes of calving.'
      : lang === 'AZ'
      ? 'Heyvan başına 10 litr isti suda (40–45°C) 1–1.5 kq. Həll olduqdan sonra, 25–30°C-də 20 litrə çatmaq üçün 10 L soyuq su əlavə edin. Doğumdan 30 dəqiqə ərzində verin.'
      : '1–1,5 кг на животное в 10 литрах тёплой воды (40–45°C). После растворения добавьте 10 л холодной воды до 20 литров при 25–30°C. Дайте в течение 30 минут после отёла.',
  },
];

const getLabels = (lang) => ({
  fortifiedWith: lang === 'EN' ? 'FORTIFIED WITH' : lang === 'AZ' ? 'ZƏNGİNLƏŞDİRİLMİŞ' : 'ОБОГАЩЁН',
  guaranteedAnalysis: lang === 'EN' ? 'GUARANTEED ANALYSIS' : lang === 'AZ' ? 'ZƏMANƏT VERİLMİŞ ANALİZ' : 'ГАРАНТИРОВАННЫЙ АНАЛИЗ',
  nutrient: lang === 'EN' ? 'NUTRIENT' : lang === 'AZ' ? 'QİDA MADDƏSİ' : 'ПИТАТЕЛЬНОЕ ВЕЩЕСТВО',
  value: lang === 'EN' ? 'VALUE' : lang === 'AZ' ? 'DƏYƏR' : 'ЗНАЧЕНИЕ',
  keyBenefits: lang === 'EN' ? 'KEY BENEFITS' : lang === 'AZ' ? 'ƏSAS FAYDALARI' : 'КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА',
  instructionsForUse: lang === 'EN' ? 'INSTRUCTIONS FOR USE' : lang === 'AZ' ? 'İSTİFADƏ QAYDASI' : 'ИНСТРУКЦИЯ ПО ПРИМЕНЕНИЮ',
  ingredients: lang === 'EN' ? 'INGREDIENTS' : lang === 'AZ' ? 'TƏRKİB' : 'СОСТАВ',
  downloadDatasheet: lang === 'EN' ? '↓ DOWNLOAD PRODUCT DATASHEET' : lang === 'AZ' ? '↓ MƏHSUL MƏLUMAт VƏRƏQƏSİNİ YÜKLƏ' : '↓ СКАЧАТЬ ТЕХПАСПОРТ ПРОДУКТА',
  back: lang === 'EN' ? 'BACK' : lang === 'AZ' ? 'GERİ' : 'НАЗАД',
  selectProduct: lang === 'EN' ? 'Select a product to view full specifications, analysis, and datasheet.' : lang === 'AZ' ? 'Tam spesifikasiyaları, analizi və texniki cədvəli görmək üçün məhsul seçin.' : 'Выберите продукт для просмотра полных характеристик, анализа и паспорта.',
  headerTitle: lang === 'EN' ? 'CATTLE MILK REPLACERS' : lang === 'AZ' ? 'MAL-QARA SÜD ƏVƏZEDİCİLƏRİ' : 'ЗАМЕНИТЕЛИ МОЛОКА ДЛЯ КРС',
  headerSub: lang === 'EN' ? 'NOVIN ROSHD SHAHRAN FOUDEH · BOVINE NUTRITION' : lang === 'AZ' ? 'NOVIN ROSHD SHAHRAN FOUDEH · BUYNUZLU MAL-QARA QİDASI' : 'NOVIN ROSHD SHAHRAN FOUDEH · ПИТАНИЕ КРС',
});

function ProductDetail({ product, onBack, labels }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Sub-header */}
      <div className="flex items-center gap-3 px-6 py-3 flex-shrink-0"
        style={{ borderBottom: `1px solid ${product.color}22`, background: `${product.color}06` }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.5)' }}>
          <ArrowLeft className="w-3 h-3" /> {labels.back}
        </button>
        <div className="font-orbitron text-sm font-bold" style={{ color: product.color }}>{product.name}</div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Tagline */}
        <p className="font-inter text-sm font-semibold" style={{ color: `${product.color}cc` }}>{product.tagline}</p>

        {/* Description */}
        <div className="rounded-xl p-4" style={{ background: `${product.color}0d`, border: `1px solid ${product.color}28` }}>
          <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{product.description}</p>
        </div>

        {/* Fortified */}
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: product.color }}>{labels.fortifiedWith}</p>
          <div className="flex flex-wrap gap-2">
            {product.fortified.map(f => (
              <span key={f} className="px-3 py-1 rounded-full text-xs font-inter"
                style={{ background: `${product.color}18`, color: `${product.color}cc`, border: `1px solid ${product.color}33` }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Analysis + Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.analysis.length > 0 && (
            <div>
              <p className="font-orbitron text-[10px] font-bold tracking-wide mb-2" style={{ color: product.color }}>{labels.guaranteedAnalysis}</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${product.color}28` }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: `${product.color}18`, borderBottom: `1px solid ${product.color}28` }}>
                      <th className="px-3 py-2 text-left font-orbitron text-[9px]" style={{ color: product.color }}>{labels.nutrient}</th>
                      <th className="px-3 py-2 text-right font-orbitron text-[9px]" style={{ color: product.color }}>{labels.value}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.analysis.map(({ nutrient, value, unit }, i) => (
                      <tr key={nutrient} style={{ borderBottom: i < product.analysis.length - 1 ? `1px solid ${product.color}10` : 'none', background: i % 2 === 0 ? `${product.color}06` : 'transparent' }}>
                        <td className="px-3 py-1.5 font-inter" style={{ color: 'rgba(255,255,255,0.7)' }}>{nutrient}</td>
                        <td className="px-3 py-1.5 text-right font-orbitron text-[10px] font-bold" style={{ color: product.color }}>{value} {unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <p className="font-orbitron text-[10px] font-bold tracking-wide mb-2" style={{ color: product.color }}>{labels.keyBenefits}</p>
            <div className="space-y-1.5">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg p-2"
                  style={{ background: `${product.color}0a`, border: `1px solid ${product.color}15` }}>
                  <Zap className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: product.color }} />
                  <span className="font-inter text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage if applicable */}
        {product.usage && (
          <div className="rounded-xl p-4" style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="font-orbitron text-[10px] font-bold mb-2" style={{ color: '#34d399' }}>{labels.instructionsForUse}</p>
            <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{product.usage}</p>
          </div>
        )}

        {/* Ingredients */}
        <div>
          <p className="font-orbitron text-[10px] font-bold mb-1" style={{ color: `${product.color}88` }}>{labels.ingredients}</p>
          <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {product.ingredients.join(', ')}.
          </p>
        </div>

        {/* Download */}
        <a href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/0dd9dfad6_Product_Foudeh.pdf"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[3px] transition-all duration-200 hover:opacity-80"
          style={{ color: `${product.color}99` }}>
          <BookOpen className="w-3.5 h-3.5" />
          {labels.downloadDatasheet}
        </a>
      </div>
    </motion.div>
  );
}

export default function CattleMilkReplacerModal({ open, onClose }) {
  const { lang } = useLang();
  const PRODUCTS = getProducts(lang);
  const labels = getLabels(lang);
  const [selected, setSelected] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(2,8,20,0.88)' }}
          onClick={(e) => { if (e.target === e.currentTarget) { setSelected(null); onClose(); } }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(4,10,16,0.97) 0%, rgba(2,8,14,0.99) 100%)',
              border: `1px solid ${BRAND_COLOR}44`,
              boxShadow: `0 0 70px rgba(56,189,248,0.12), 0 40px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${BRAND_COLOR}22`, background: `${BRAND_COLOR}07` }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${BRAND_COLOR}28`, border: `1.5px solid ${BRAND_COLOR}55`, boxShadow: `0 0 14px rgba(56,189,248,0.4)` }}>
                  <span className="text-lg">🐄</span>
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white tracking-[2px]">{labels.headerTitle}</div>
                  <div className="font-mono text-[9px] tracking-[3px] mt-0.5" style={{ color: `${BRAND_COLOR}88` }}>
                    {labels.headerSub}
                  </div>
                </div>
              </div>
              <button onClick={() => { setSelected(null); onClose(); }}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {selected ? (
                <ProductDetail key="detail" product={selected} onBack={() => setSelected(null)} labels={labels} />
              ) : (
                <motion.div key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto p-6 space-y-3"
                >
                  <p className="font-inter text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {labels.selectProduct}
                  </p>
                  {PRODUCTS.map((product, i) => (
                    <motion.div
                      key={product.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="group rounded-xl p-4 cursor-pointer transition-all duration-200"
                      style={{ background: `linear-gradient(135deg, ${product.color}0d, ${product.color}05)`, border: `1px solid ${product.color}28` }}
                      whileHover={{ scale: 1.015, boxShadow: `0 0 24px ${product.color}40`, borderColor: `${product.color}60` }}
                      onClick={() => setSelected(product)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${product.color}22`, border: `1px solid ${product.color}40`, boxShadow: `0 0 10px ${product.color}40` }}>
                          <ChevronRight className="w-4 h-4" style={{ color: product.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-orbitron text-sm font-bold mb-0.5" style={{ color: product.color }}>{product.name}</div>
                          <div className="font-mono text-[9px] tracking-widest mb-1" style={{ color: `${product.color}77` }}>{product.tagline}</div>
                          <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{product.description.slice(0, 120)}…</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
