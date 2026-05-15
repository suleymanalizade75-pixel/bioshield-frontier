import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * Product Catalog Population Utility
 * Populates comprehensive product database with ImmuCell, XVET, Kerry Group, Milk Replacers
 * and veterinary categories with precise dosage and clinical data
 */

const PRODUCT_DATA = [
  // ─── IMMUCELL VACCINES ──────────────────────────────────────────
  {
    name: 'First Defense (FD-001)',
    brand: 'ImmuCell',
    category: 'Vaccines',
    clinical_indication: 'Prevention of neonatal calf scours (E. coli K99+, rotavirus)',
    description: 'Passively-transferred antibody bolus for newborn calves',
    species: ['Bovine'],
    dosage_form: 'Oral - Bolus',
    dosage: '1 bolus per calf',
    dosage_unit: 'dose/animal',
    route_of_administration: 'Oral',
    age_restrictions: 'Newborns only (within 12 hours of birth)',
    treatment_duration: 'Single application',
    active_ingredient: 'Bovine immunoglobulins (polyclonal antibodies)',
    efficacy_rate: 100,
    price: 23.00,
    symptoms: ['scours', 'calf diarrhea', 'colostrum deficiency'],
    tags: ['neonatal', 'passive immunity', 'scours prevention', 'USDA approved'],
    gmp_certified: true,
    withdrawal_period: 'None required',
    features: [
      'Guaranteed passive immunity from birth',
      'Single-dose convenience',
      'USDA-approved and field-proven',
      'Eliminates reliance on maternal antibodies'
    ]
  },
  {
    name: 'Tri-Shield (TRI-001)',
    brand: 'ImmuCell',
    category: 'Vaccines',
    clinical_indication: 'Prevention of neonatal calf scours (E. coli K99+, coronavirus, rotavirus)',
    description: 'Triple-layer passive antibody protection for newborn calves',
    species: ['Bovine'],
    dosage_form: 'Oral - Bolus',
    dosage: '1 bolus per calf',
    dosage_unit: 'dose/animal',
    route_of_administration: 'Oral',
    age_restrictions: 'Newborns only (within 12 hours of birth)',
    treatment_duration: 'Single application',
    active_ingredient: 'Bovine immunoglobulins (polyclonal antibodies)',
    efficacy_rate: 100,
    price: 56.00,
    symptoms: ['scours', 'calf diarrhea', 'rotavirus', 'coronavirus', 'colostrum deficiency'],
    tags: ['neonatal', 'passive immunity', 'scours prevention', 'rotavirus protection', 'USDA approved'],
    gmp_certified: true,
    withdrawal_period: 'None required',
    features: [
      'Three-pathogen protection: E. coli, coronavirus, rotavirus',
      'Single gel tube application',
      'USDA-approved',
      'Superior protection vs. First Defense'
    ]
  },

  // ─── XVET FEED ADDITIVES ────────────────────────────────────────
  {
    name: 'Aromax',
    brand: 'XVET',
    category: 'Feed Additives',
    clinical_indication: 'Respiratory support and heat stress management',
    description: 'Concentrated essential oils for respiratory and thermal stress mitigation',
    species: ['Poultry', 'Bovine', 'Ovine', 'Caprine'],
    dosage_form: 'Liquid - Drench',
    dosage: '100 ml per 1000 L water',
    dosage_unit: 'ml/L water',
    route_of_administration: 'Drinking water',
    treatment_duration: 'Daily during heat stress or respiratory challenge',
    active_ingredient: 'Essential oils (eucalyptus, thyme, oregano)',
    efficacy_rate: 87,
    price: 45.00,
    symptoms: ['heat stress', 'respiratory infection', 'breathing difficulty', 'coughing'],
    tags: ['respiratory support', 'stress management', 'essential oils', 'GMP certified'],
    gmp_certified: true,
    withdrawal_period: 'None required',
    features: [
      'High-quality concentrated botanical blend',
      'GMP+ certified German manufacture',
      'Dual action: respiratory + thermal regulation'
    ]
  },
  {
    name: 'Turbo Grow',
    brand: 'XVET',
    category: 'Feed Additives',
    clinical_indication: 'FCR optimization and mycotoxin binding',
    description: 'Yeast cell wall extract with bentonite for feed conversion and toxin neutralization',
    species: ['Bovine', 'Ovine', 'Caprine', 'Poultry'],
    dosage_form: 'Powder - Premix',
    dosage: '750 g per 1000 kg feed',
    dosage_unit: 'g/kg feed',
    route_of_administration: 'Feed-mixed',
    treatment_duration: 'Daily',
    active_ingredient: 'MOS (mannan oligosaccharides), β-Glucans, Bentonite',
    efficacy_rate: 94.8,
    price: 78.50,
    symptoms: ['poor feed conversion', 'mycotoxin exposure', 'feed contamination'],
    tags: ['mycotoxin binder', 'FCR improvement', 'gut health', 'GMP certified'],
    gmp_certified: true,
    withdrawal_period: 'None required',
    features: [
      '94.8% efficacy against Aflatoxin B1',
      'Improves FCR by 6-8%',
      'GMP+ certified'
    ]
  },

  // ─── ANTIBIOTICS & ANTIPARASITICS ───────────────────────────────
  {
    name: 'Oxytetracycline Injectable',
    brand: 'Generic',
    category: 'Antibiotics',
    clinical_indication: 'Bacterial infections (respiratory, urinary, soft tissue)',
    description: 'Broad-spectrum tetracycline antibiotic for livestock',
    species: ['Bovine', 'Porcine', 'Ovine', 'Caprine', 'Poultry'],
    dosage_form: 'Injectable - Liquid',
    dosage: '20 mg/kg',
    dosage_unit: 'mg/kg',
    route_of_administration: 'Intramuscular (IM) or Intravenous (IV)',
    treatment_duration: '3-5 days',
    active_ingredient: 'Oxytetracycline dihydrate 200 mg/ml',
    efficacy_rate: 88,
    price: 12.00,
    symptoms: ['bacterial infection', 'respiratory infection', 'pneumonia', 'mastitis'],
    tags: ['antibiotic', 'broad-spectrum', 'injectable'],
    contraindications: ['Pregnancy', 'Renal dysfunction'],
    withdrawal_period: '28 days (meat)',
    features: ['Effective against Gram-positive and Gram-negative bacteria']
  },
  {
    name: 'Ivermectin Pour-on',
    brand: 'Generic',
    category: 'Anti-parasitic',
    clinical_indication: 'Gastrointestinal and ectoparasites (cattle, sheep, goats)',
    description: 'Macrocyclic lactone anthelmintic for livestock parasites',
    species: ['Bovine', 'Ovine', 'Caprine', 'Equine'],
    dosage_form: 'Pour-on',
    dosage: '0.2 mg/kg',
    dosage_unit: 'mg/kg',
    route_of_administration: 'Topical (pour-on)',
    treatment_duration: 'Single application',
    active_ingredient: 'Ivermectin 5 mg/ml',
    efficacy_rate: 99,
    price: 8.50,
    symptoms: ['parasite infestation', 'worm burden', 'lice', 'mites', 'internal parasites'],
    tags: ['antiparasitic', 'gastrointestinal', 'ectoparasite', 'broad-spectrum'],
    withdrawal_period: '48 hours (meat)',
    features: ['Broad-spectrum activity', 'Single application', 'Pour-on convenience']
  },

  // ─── MILK REPLACERS ─────────────────────────────────────────────
  {
    name: 'CattleCare Milk Replacer',
    brand: 'Proprietary',
    category: 'Milk Replacers',
    clinical_indication: 'Nutritional replacement for orphaned or rejected calves',
    description: 'Complete milk replacer formulation for young calves',
    species: ['Bovine'],
    dosage_form: 'Powder - Premix',
    dosage: '150-200 g per liter water',
    dosage_unit: 'g/animal',
    route_of_administration: 'Oral (bottle or bucket fed)',
    treatment_duration: '8-10 weeks',
    active_ingredient: 'Milk proteins, lactose, fats, vitamins, minerals',
    efficacy_rate: 95,
    price: 35.00,
    symptoms: ['orphaned calf', 'rejected calf', 'colostrum deficiency'],
    tags: ['milk replacer', 'calf nutrition', 'growth support'],
    withdrawal_period: 'None required',
    features: ['IgG-enhanced formula', 'Complete amino acid profile']
  },
  {
    name: 'LambCare Milk Replacer',
    brand: 'Proprietary',
    category: 'Milk Replacers',
    clinical_indication: 'Nutritional replacement for orphaned lambs',
    description: 'Specialized milk replacer for lambs (ovine)',
    species: ['Ovine'],
    dosage_form: 'Powder - Premix',
    dosage: '100-120 g per liter water',
    dosage_unit: 'g/animal',
    route_of_administration: 'Oral (bottle or bucket fed)',
    treatment_duration: '6-8 weeks',
    active_ingredient: 'Ewe milk proteins, lactose, fats, vitamins, minerals',
    efficacy_rate: 92,
    price: 28.00,
    symptoms: ['orphaned lamb', 'rejected lamb', 'ewe milk deficiency'],
    tags: ['milk replacer', 'lamb nutrition', 'growth support'],
    withdrawal_period: 'None required',
    features: ['Species-specific formula']
  },

  // ─── RESPIRATORY TREATMENTS ─────────────────────────────────────
  {
    name: 'Respiratory Support Bolus',
    brand: 'XVET',
    category: 'Respiratory system',
    clinical_indication: 'Viral and bacterial respiratory infections',
    description: 'Herbal-based respiratory support supplement',
    species: ['Poultry', 'Bovine', 'Porcine'],
    dosage_form: 'Oral - Tablet',
    dosage: '2-4 tablets per 100 kg body weight',
    dosage_unit: 'dose/animal',
    route_of_administration: 'Oral',
    treatment_duration: '7-10 days',
    active_ingredient: 'Thyme, eucalyptus, vitamin C, zinc',
    efficacy_rate: 78,
    price: 42.00,
    symptoms: ['respiratory infection', 'coughing', 'nasal discharge', 'breathing difficulty'],
    tags: ['respiratory', 'herbal', 'bronchitis', 'pneumonia support'],
    withdrawal_period: 'None required',
    features: ['Natural ingredients', 'Easy oral administration']
  }
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Check if products already exist
    const existingProducts = await base44.entities.Product.list();
    const existingNames = new Set(existingProducts.map(p => p.name));
    
    const productsToCreate = PRODUCT_DATA.filter(p => !existingNames.has(p.name));

    if (productsToCreate.length === 0) {
      return Response.json({
        status: 'success',
        message: 'All products already in database',
        total_products: existingProducts.length,
        new_products_added: 0,
      });
    }

    // Bulk create products
    const created = await base44.entities.Product.bulkCreate(productsToCreate);

    return Response.json({
      status: 'success',
      message: 'Product catalog populated successfully',
      new_products_added: created.length,
      total_products_in_db: existingProducts.length + created.length,
      categories_populated: [...new Set(PRODUCT_DATA.map(p => p.category))],
      brands_added: [...new Set(PRODUCT_DATA.map(p => p.brand))],
    });

  } catch (error) {
    console.error('Catalog population error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});