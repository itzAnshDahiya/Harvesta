// Mock pest identification AI — simulates an image analysis response
const pestDatabase = [
  {
    id: 'aphid',
    name: 'Aphid Infestation',
    scientificName: 'Aphidoidea',
    confidence: 94.2,
    severity: 'Medium',
    description: 'Aphids are small sap-sucking insects that cluster on new growth, causing leaf curling and yellowing. They secrete honeydew which promotes sooty mold.',
    symptoms: ['Curled or distorted leaves', 'Sticky honeydew on surfaces', 'Yellowing foliage', 'Stunted plant growth'],
    treatment: [
      'Apply neem oil spray (2ml/L water)',
      'Introduce ladybug predators',
      'Use insecticidal soap solution',
      'Remove heavily infested parts',
    ],
    prevention: ['Regular crop monitoring', 'Maintain beneficial insect habitat', 'Avoid excess nitrogen fertilization'],
    affectedCrops: ['Tomato', 'Wheat', 'Cotton', 'Mustard'],
  },
  {
    id: 'whitefly',
    name: 'Whitefly Attack',
    scientificName: 'Aleyrodidae',
    confidence: 88.7,
    severity: 'High',
    description: 'Whiteflies are tiny winged insects that feed on plant sap from the underside of leaves. They can transmit viral diseases and weaken plants significantly.',
    symptoms: ['White insects on leaf undersides', 'Leaf chlorosis', 'Sooty mold growth', 'Premature leaf drop'],
    treatment: [
      'Yellow sticky traps for monitoring',
      'Spray with Imidacloprid (0.3ml/L)',
      'Apply Beauveria bassiana biopesticide',
      'Use reflective mulches',
    ],
    prevention: ['Screen greenhouse vents', 'Remove weed hosts', 'Rotate crops regularly'],
    affectedCrops: ['Cotton', 'Tomato', 'Brinjal', 'Okra'],
  },
  {
    id: 'leaf_blight',
    name: 'Leaf Blight Disease',
    scientificName: 'Helminthosporium spp.',
    confidence: 91.5,
    severity: 'High',
    description: 'Leaf blight causes elongated brown lesions on leaves that can merge and kill entire leaf tissue. Common in warm, humid conditions.',
    symptoms: ['Brown elongated lesions', 'Leaf tip necrosis', 'Grey-green wilting', 'Reduced grain filling'],
    treatment: [
      'Apply Mancozeb fungicide (2.5g/L)',
      'Spray Propiconazole (1ml/L)',
      'Remove infected plant debris',
      'Improve field drainage',
    ],
    prevention: ['Use resistant varieties', 'Balanced fertilization', 'Proper plant spacing'],
    affectedCrops: ['Rice', 'Wheat', 'Maize', 'Sorghum'],
  },
  {
    id: 'army_worm',
    name: 'Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    confidence: 96.1,
    severity: 'Critical',
    description: 'Fall armyworm larvae feed voraciously on leaves, creating large ragged holes. They can devastate entire fields within days if not controlled promptly.',
    symptoms: ['Large irregular holes in leaves', 'Sawdust-like frass', 'Skeletonized leaves', 'Damaged growing points'],
    treatment: [
      'Apply Chlorantraniliprole (0.4ml/L)',
      'Use Bacillus thuringiensis (Bt) spray',
      'Hand-pick larvae in small fields',
      'Apply Spinosad-based insecticides',
    ],
    prevention: ['Early planting', 'Pheromone traps for monitoring', 'Intercropping with repellent plants'],
    affectedCrops: ['Maize', 'Rice', 'Sugarcane', 'Sorghum'],
  },
  {
    id: 'healthy',
    name: 'Healthy Plant',
    scientificName: 'N/A',
    confidence: 97.8,
    severity: 'None',
    description: 'The plant appears healthy with no visible signs of pest damage or disease. Continue regular monitoring and preventive care.',
    symptoms: [],
    treatment: ['No treatment needed — maintain current care regimen'],
    prevention: ['Continue regular monitoring', 'Maintain soil health', 'Ensure proper irrigation'],
    affectedCrops: [],
  },
];

exports.identify = async (req, res) => {
  try {
    // In a real app, you'd process an uploaded image with an ML model.
    // Here we randomly select from the database to simulate AI analysis.
    const randomIndex = Math.floor(Math.random() * pestDatabase.length);
    const result = pestDatabase[randomIndex];

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    res.json({
      success: true,
      data: {
        ...result,
        analyzedAt: new Date().toISOString(),
        processingTimeMs: Math.floor(Math.random() * 500) + 300,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDatabase = async (req, res) => {
  try {
    const summary = pestDatabase.map((p) => ({
      id: p.id,
      name: p.name,
      scientificName: p.scientificName,
      severity: p.severity,
      affectedCrops: p.affectedCrops,
    }));
    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
