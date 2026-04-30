const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:     { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  unit:     { type: String, required: true },
  minStock: { type: Number, default: 0 },
  cost:     { type: Number, default: 0 },
  notes:    { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventorySchema);
