// Server Configuration
module.exports = {
  port: process.env.PORT || 4000,
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://127.0.0.1:5000',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  simulationInterval: 5000 // ms between zone updates
};
