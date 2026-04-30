const Field = require('../models/Field');

exports.getFieldsByUser = async (req, res) => {
  try {
    const fields = await Field.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, data: fields });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch fields' });
  }
};

exports.createField = async (req, res) => {
  try {
    const { name, latitude, longitude, sizeHectares, soilType } = req.body;
    if (!name || latitude == null || longitude == null || sizeHectares == null) {
      return res.status(400).json({ success: false, message: 'name, latitude, longitude, sizeHectares required' });
    }
    const field = await Field.create({ user: req.user._id, name, latitude: +latitude, longitude: +longitude, sizeHectares: +sizeHectares, soilType: soilType || 'Loam' });
    res.status(201).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const field = await Field.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!field) return res.status(404).json({ success: false, message: 'Field not found' });
    res.json({ success: true, message: 'Field deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addCrop = async (req, res) => {
  try {
    const { name, variety, stage } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Crop name required' });
    const field = await Field.findOne({ _id: req.params.fieldId, user: req.user._id });
    if (!field) return res.status(404).json({ success: false, message: 'Field not found' });
    field.crops.push({ name, variety: variety || '', stage: stage || 'Planted' });
    await field.save();
    res.status(201).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
