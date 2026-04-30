// Mock commodity market data — simulates real-time agricultural prices
const commodities = [
  { id: 'wheat', name: 'Wheat', unit: '₹/quintal', price: 2275, change: +2.3, trend: [2200, 2210, 2240, 2255, 2260, 2275], category: 'Grain' },
  { id: 'rice', name: 'Rice (Basmati)', unit: '₹/quintal', price: 3850, change: -0.8, trend: [3900, 3880, 3870, 3860, 3855, 3850], category: 'Grain' },
  { id: 'maize', name: 'Maize', unit: '₹/quintal', price: 1962, change: +1.5, trend: [1920, 1930, 1940, 1945, 1955, 1962], category: 'Grain' },
  { id: 'soybean', name: 'Soybean', unit: '₹/quintal', price: 4350, change: +3.1, trend: [4200, 4250, 4280, 4310, 4330, 4350], category: 'Oilseed' },
  { id: 'cotton', name: 'Cotton', unit: '₹/quintal', price: 6720, change: -1.2, trend: [6800, 6790, 6770, 6750, 6740, 6720], category: 'Fiber' },
  { id: 'sugarcane', name: 'Sugarcane', unit: '₹/quintal', price: 315, change: +0.5, trend: [310, 311, 312, 313, 314, 315], category: 'Cash Crop' },
  { id: 'tomato', name: 'Tomato', unit: '₹/kg', price: 42, change: +8.2, trend: [35, 37, 38, 39, 40, 42], category: 'Vegetable' },
  { id: 'onion', name: 'Onion', unit: '₹/kg', price: 28, change: -3.4, trend: [32, 31, 30, 29, 28, 28], category: 'Vegetable' },
  { id: 'potato', name: 'Potato', unit: '₹/kg', price: 18, change: +1.1, trend: [16, 16, 17, 17, 18, 18], category: 'Vegetable' },
  { id: 'mustard', name: 'Mustard Seed', unit: '₹/quintal', price: 5480, change: +2.7, trend: [5300, 5340, 5380, 5420, 5450, 5480], category: 'Oilseed' },
  { id: 'turmeric', name: 'Turmeric', unit: '₹/quintal', price: 8900, change: +4.5, trend: [8500, 8600, 8700, 8780, 8850, 8900], category: 'Spice' },
  { id: 'chilli', name: 'Red Chilli', unit: '₹/quintal', price: 14500, change: -2.1, trend: [15000, 14900, 14800, 14700, 14600, 14500], category: 'Spice' },
];

exports.getPrices = async (req, res) => {
  try {
    // Add small random fluctuations to simulate live data
    const liveData = commodities.map((c) => ({
      ...c,
      price: +(c.price * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2),
    }));
    res.json({ success: true, data: liveData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { commodityId } = req.params;
    const commodity = commodities.find((c) => c.id === commodityId);
    if (!commodity) return res.status(404).json({ success: false, message: 'Commodity not found' });

    // Generate 30 days of mock history
    const history = [];
    let price = commodity.price * 0.9;
    for (let i = 30; i >= 0; i--) {
      price += (Math.random() - 0.45) * (commodity.price * 0.02);
      const date = new Date();
      date.setDate(date.getDate() - i);
      history.push({ date: date.toISOString().split('T')[0], price: +price.toFixed(2) });
    }
    res.json({ success: true, data: { commodity: commodity.name, history } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
