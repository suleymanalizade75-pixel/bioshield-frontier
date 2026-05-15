export const getSpeciesLabel = (speciesEnglish, lang = 'EN') => {
  const speciesTranslations = {
    'Bovine': { EN: 'Bovine', AZ: 'İriləpəli (Maldarlıq)', RU: 'КРС' },
    'Porcine': { EN: 'Porcine', AZ: 'Donuzçuluq', RU: 'Свиньи' },
    'Ovine': { EN: 'Ovine', AZ: 'Qoyunçuluq', RU: 'Овцы' },
    'Poultry': { EN: 'Poultry', AZ: 'Quşçuluq', RU: 'Птица' },
    'Equine': { EN: 'Equine', AZ: 'Atlılıq', RU: 'Лошади' },
    'Caprine': { EN: 'Caprine', AZ: 'Keçiçilik', RU: 'Козы' },
    'Canine': { EN: 'Canine', AZ: 'İtçilik', RU: 'Собаки' },
    'Feline': { EN: 'Feline', AZ: 'Pişikçilik', RU: 'Кошки' },
    'Aquaculture': { EN: 'Aquaculture', AZ: 'Akvakultura', RU: 'Аквакультура' },
    'Bees': { EN: 'Bees', AZ: 'Arıçılıq', RU: 'Пчёлы' }
  };

  const translation = speciesTranslations[speciesEnglish];
  if (!translation) return speciesEnglish;
  return translation[lang] || translation['EN'];
};

export const SPECIES_EMOJI = {
  'Bovine': '🐄',
  'Porcine': '🐷',
  'Ovine': '🐑',
  'Poultry': '🐔',
  'Equine': '🐴',
  'Caprine': '🐐',
  'Canine': '🐕',
  'Feline': '🐈',
  'Aquaculture': '🐠',
  'Bees': '🐝'
};