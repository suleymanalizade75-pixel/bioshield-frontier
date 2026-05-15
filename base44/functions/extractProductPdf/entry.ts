import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { file_url } = await req.json();

    if (!file_url) {
      return Response.json({ error: 'file_url is required' }, { status: 400 });
    }

    const extractionPrompt = `Extract product information from this PDF. Return ONLY a JSON array of products.
    
    For each product, extract:
    - name (product name only)
    - category (must be one of: "Anti-inflammatory/Analgesic", "Anti-parasitic", "Antibiotics", "Nutritional supplement", "Respiratory system")
    - description (brief product description)
    - species (array of species it covers: Bovine, Porcine, Ovine, Poultry, Equine, Caprine, Aquaculture, Bees)
    - features (array of key features/benefits)
    - price (numeric value if available, null otherwise)
    
    IMPORTANT: DO NOT include company names, contact details, phone numbers, emails, or addresses.
    ONLY extract product data.
    
    Return valid JSON only, no markdown or extra text.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: extractionPrompt,
      file_urls: [file_url],
      response_json_schema: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                category: { type: 'string' },
                description: { type: 'string' },
                species: { type: 'array', items: { type: 'string' } },
                features: { type: 'array', items: { type: 'string' } },
                price: { type: ['number', 'null'] }
              },
              required: ['name', 'category', 'species']
            }
          }
        },
        required: ['products']
      }
    });

    return Response.json({
      success: true,
      products: result.products || []
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});