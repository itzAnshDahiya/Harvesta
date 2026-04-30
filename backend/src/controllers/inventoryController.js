const db = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.getAll = (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM inventory_items WHERE user_id = ? ORDER BY updated_at DESC').all(req.user.id);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = (req, res) => {
  try {
    const { name, category, quantity, unit, minStock, cost, notes } = req.body;
    if (!name || !category || quantity === undefined || !unit) {
      return res.status(400).json({ success: false, message: 'name, category, quantity, and unit are required' });
    }
    const id = uuidv4();
    db.prepare(
      'INSERT INTO inventory_items (id, user_id, name, category, quantity, unit, min_stock, cost, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(id, req.user.id, name, category, Number(quantity), unit, Number(minStock || 0), Number(cost || 0), notes || null);
    const item = db.prepare('SELECT * FROM inventory_items WHERE id = ?').get(id);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM inventory_items WHERE id = ? AND user_id = ?').get(id, req.user.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Item not found' });
    const { name, category, quantity, unit, minStock, cost, notes } = req.body;
    db.prepare(
      `UPDATE inventory_items SET name=COALESCE(?,name), category=COALESCE(?,category), quantity=COALESCE(?,quantity), unit=COALESCE(?,unit), min_stock=COALESCE(?,min_stock), cost=COALESCE(?,cost), notes=COALESCE(?,notes), updated_at=datetime('now') WHERE id=?`
    ).run(name||null, category||null, quantity!==undefined?Number(quantity):null, unit||null, minStock!==undefined?Number(minStock):null, cost!==undefined?Number(cost):null, notes!==undefined?notes:null, id);
    const item = db.prepare('SELECT * FROM inventory_items WHERE id = ?').get(id);
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM inventory_items WHERE id = ? AND user_id = ?').get(id, req.user.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Item not found' });
    db.prepare('DELETE FROM inventory_items WHERE id = ?').run(id);
    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
