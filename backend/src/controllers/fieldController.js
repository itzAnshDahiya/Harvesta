const db = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.getFieldsByUser = (req, res) => {
  try {
    const fields = db.prepare('SELECT * FROM fields WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);

    // Attach crops to each field
    const getCrops = db.prepare('SELECT * FROM crops WHERE field_id = ?');
    const result = fields.map((f) => ({
      ...f,
      crops: getCrops.all(f.id),
    }));

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch fields' });
  }
};

exports.createField = (req, res) => {
  try {
    const { name, latitude, longitude, sizeHectares, soilType } = req.body;

    if (!name || latitude === undefined || longitude === undefined || sizeHectares === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, latitude, longitude and sizeHectares are required',
      });
    }

    const lat = Number(latitude);
    const lon = Number(longitude);
    const size = Number(sizeHectares);

    if ([lat, lon, size].some(Number.isNaN)) {
      return res.status(400).json({
        success: false,
        message: 'latitude, longitude and sizeHectares must be valid numbers',
      });
    }

    const id = uuidv4();
    db.prepare(
      'INSERT INTO fields (id, user_id, name, latitude, longitude, size_hectares, soil_type) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(id, req.user.id, name, lat, lon, size, soilType || 'Loam');

    const field = db.prepare('SELECT * FROM fields WHERE id = ?').get(id);
    res.status(201).json({ success: true, data: { ...field, crops: [] } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create field', error: error.message });
  }
};

exports.deleteField = (req, res) => {
  try {
    const { id } = req.params;
    const field = db.prepare('SELECT * FROM fields WHERE id = ? AND user_id = ?').get(id, req.user.id);
    if (!field) return res.status(404).json({ success: false, message: 'Field not found' });

    db.prepare('DELETE FROM fields WHERE id = ?').run(id);
    res.json({ success: true, message: 'Field deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addCrop = (req, res) => {
  try {
    const { fieldId } = req.params;
    const { name, variety, stage } = req.body;

    if (!name) return res.status(400).json({ success: false, message: 'Crop name is required' });

    const field = db.prepare('SELECT * FROM fields WHERE id = ? AND user_id = ?').get(fieldId, req.user.id);
    if (!field) return res.status(404).json({ success: false, message: 'Field not found' });

    const id = uuidv4();
    db.prepare('INSERT INTO crops (id, field_id, name, variety, stage) VALUES (?, ?, ?, ?, ?)').run(
      id, fieldId, name, variety || null, stage || 'Planted'
    );

    const crop = db.prepare('SELECT * FROM crops WHERE id = ?').get(id);
    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
