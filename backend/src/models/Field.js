const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  variety:  { type: String, default: '' },
  stage:    { type: String, default: 'Planted' },
  plantedAt:{ type: Date, default: Date.now },
});

const fieldSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:         { type: String, required: true },
  latitude:     { type: Number, required: true },
  longitude:    { type: Number, required: true },
  sizeHectares: { type: Number, required: true },
  soilType:     { type: String, default: 'Loam' },
  status:       { type: String, default: 'active' },
  crops:        [cropSchema],
}, { timestamps: true });

module.exports = mongoose.model('Field', fieldSchema);
