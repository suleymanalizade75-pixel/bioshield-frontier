import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * AI Symptom-to-Product Mapping Engine
 * Maps livestock disease symptoms to precise product recommendations with dosage
 * Includes external LLM verification for medical accuracy
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { symptoms, species, age_group, language = 'EN' } = await req.json();
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return Response.json({ error: 'Symptoms array required' }, { status: 400 });
    }
    
    if (!species) {
      return Response.json({ error: 'Species required' }, { status: 400 });
    }

    // 1. Query products database for symptom matches
    const allProducts = await base44.entities.Product.list();
    
    const matchedProducts = allProducts.filter(product => {
      const speciesMatch = product.species?.includes(species);
      const symptomsMatch = product.symptoms?.some(tag => 
        symptoms.some(symptom => 
          tag.toLowerCase().includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(tag.toLowerCase())
        )
      );
      const ageMatch = !product.age_restrictions || 
        product.age_restrictions.toLowerCase().includes('all ages') ||
        (age_group && product.age_restrictions.toLowerCase().includes(age_group.toLowerCase()));
      
      return speciesMatch && symptomsMatch && ageMatch;
    });

    // 2. Format recommendations with localized dosage
    const recommendations = matchedProducts.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      clinical_indication: product.clinical_indication,
      dosage: product.dosage,
      dosage_unit: product.dosage_unit,
      route_of_administration: product.route_of_administration,
      treatment_duration: product.treatment_duration,
      age_restrictions: product.age_restrictions,
      contraindications: product.contraindications || [],
      withdrawal_period: product.withdrawal_period,
      efficacy_rate: product.efficacy_rate,
      price: product.price,
      active_ingredient: product.active_ingredient,
    }));

    // 3. External LLM verification (if recommendations exist)
    let verificationResult = null;
    if (recommendations.length > 0) {
      try {
        const symptomList = symptoms.join(', ');
        const prompt = `
You are a veterinary pharmacology expert. A livestock farmer has reported the following symptoms in their ${species}:
Symptoms: ${symptomList}
Age group: ${age_group || 'Not specified'}

Based on reputable veterinary databases (AAFCO, CVMP, etc.), verify if the following product recommendations are medically sound:
${recommendations.map(r => `- ${r.name} (${r.brand}): ${r.dosage} ${r.dosage_unit} via ${r.route_of_administration}`).join('\n')}

Respond with:
1. VERIFIED (all products are appropriate) or PARTIAL (some products appropriate) or REJECTED
2. Recommended dosage adjustments if any
3. Any additional contraindications or warnings
Keep response brief and clinical.`;

        verificationResult = await base44.integrations.Core.InvokeLLM({
          prompt,
          model: 'gemini_3_flash',
          add_context_from_internet: false,
        });
      } catch (llmError) {
        console.warn('LLM verification failed, returning unverified recommendations', llmError.message);
      }
    }

    return Response.json({
      status: 'success',
      species,
      age_group: age_group || 'Not specified',
      matched_symptoms: symptoms,
      recommendations: recommendations.sort((a, b) => (b.efficacy_rate || 0) - (a.efficacy_rate || 0)),
      recommendation_count: recommendations.length,
      external_verification: verificationResult,
      language,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Symptom mapping error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});