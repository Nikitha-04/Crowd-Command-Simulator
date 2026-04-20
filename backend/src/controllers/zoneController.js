// Zone Controller - Business logic for crowd zones
const { simulateZones } = require('../services/simulator');

let currentZones = simulateZones();

const getZones = () => currentZones;

const updateZones = () => {
  currentZones = simulateZones(currentZones);
  return currentZones;
};

module.exports = { getZones, updateZones };
