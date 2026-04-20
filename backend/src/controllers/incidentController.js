// Incident Controller - Business logic for incidents
let activeIncidents = [];

const getIncidents = () => activeIncidents;

const createIncident = (incidentData) => {
  const newIncident = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'pending',
    ...incidentData
  };
  activeIncidents.unshift(newIncident);
  return newIncident;
};

const updateIncident = (id, status) => {
  activeIncidents = activeIncidents.map(inc =>
    inc.id === id ? { ...inc, status } : inc
  );
  return activeIncidents.find(inc => inc.id === id);
};

module.exports = { getIncidents, createIncident, updateIncident };
