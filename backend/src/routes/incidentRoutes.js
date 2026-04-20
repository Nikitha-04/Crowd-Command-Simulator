// API Routes - Incident endpoints
const express = require('express');
const router = express.Router();
const { getIncidents, createIncident, updateIncident } = require('../controllers/incidentController');

// GET /api/incidents - List all incidents
router.get('/incidents', (req, res) => {
  res.json(getIncidents());
});

// POST /api/incidents - Report a new incident
router.post('/incidents', (req, res) => {
  const incident = createIncident(req.body);
  res.status(201).json(incident);
});

// PATCH /api/incidents/:id - Update incident status
router.patch('/incidents/:id', (req, res) => {
  const updated = updateIncident(req.params.id, req.body.status);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: 'Incident not found' });
  }
});

module.exports = router;
