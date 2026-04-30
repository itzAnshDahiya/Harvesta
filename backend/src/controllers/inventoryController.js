const InventoryItem = require('../models/InventoryItem');

exports.getAll = async (req, res) => {
  try {
    const items = await InventoryItem.find({ user: req.user._id }).sort('-updatedAt');
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, category, quantity, unit, minStock, cost, notes } = req.body;
    if (!name || !category || quantity == null || !unit) {
      return res.status(400).json({ success: false, message: 'name, category, quantity, unit required' });
    }
    const item = await InventoryItem.create({ user: req.user._id, name, category, quantity: +quantity, unit, minStock: +(minStock||0), cost: +(cost||0), notes: notes||'' });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await InventoryItem.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await InventoryItem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
