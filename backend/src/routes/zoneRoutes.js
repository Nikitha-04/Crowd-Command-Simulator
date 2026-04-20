// API Routes - Zone endpoints
const express = require('express');
const router = express.Router();
const { getZones } = require('../controllers/zoneController');

// GET /api/zones - Get current zone data
router.get('/zones', (req, res) => {
  const zones = getZones();
  res.json(zones);
});

module.exports = router;
