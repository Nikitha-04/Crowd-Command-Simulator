// Utility helpers
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const formatTimestamp = () => {
  return new Date().toISOString();
};

module.exports = { generateId, formatTimestamp };
