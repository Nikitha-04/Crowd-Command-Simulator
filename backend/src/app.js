require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const config = require('../config');
const { requestLogger, errorHandler } = require('./middleware/errorHandler');
const { getZones, updateZones } = require('./controllers/zoneController');
const { getIncidents, createIncident, updateIncident } = require('./controllers/incidentController');
const { callAIService } = require('./services/aiService');
const { generateId, formatTimestamp } = require('./utils/helpers');

// ─── Express Setup ───────────────────────────────────────────
const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(requestLogger);

// ─── HTTP Routes ─────────────────────────────────────────────
const zoneRoutes = require('./routes/zoneRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
app.use('/api', zoneRoutes);
app.use('/api', incidentRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'CrowdCommand Backend', uptime: process.uptime() });
});

// Error handling
app.use(errorHandler);

// ─── Socket.io Setup ─────────────────────────────────────────
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send initial data
  socket.emit('zone_update', getZones());
  socket.emit('incident_list', getIncidents());

  socket.on('trigger_panic', (data) => {
    console.log(`Panic triggered for zone ${data.zoneId}`);
    io.emit('emergency', {
      zoneId: data.zoneId,
      timestamp: formatTimestamp(),
      message: `EMERGENCY DECLARED — Zone ${data.zoneId}`
    });
  });

  socket.on('report_incident', (incidentData) => {
    console.log(`[BACKEND] Received incident report from: ${incidentData.reporter}`);
    const newIncident = createIncident(incidentData);
    io.emit('new_incident', newIncident);
    console.log(`[BACKEND] Broadcasted new incident. Total active: ${getIncidents().length}`);
  });

  socket.on('update_incident', (data) => {
    updateIncident(data.id, data.status);
    io.emit('incident_updated', data);
    console.log(`Incident ${data.id} updated to ${data.status}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// ─── Simulation Loop ─────────────────────────────────────────
setInterval(async () => {
  const zones = updateZones();
  io.emit('zone_update', zones);

  try {
    const data = await callAIService(zones);

    if (data.alerts && data.alerts.length > 0) {
      data.alerts.forEach(alert => {
        io.emit('new_alert', {
          id: generateId(),
          severity: alert.severity,
          zone: alert.zone,
          message: alert.message,
          timestamp: formatTimestamp()
        });
      });
    }

    if (data.suggestions && data.suggestions.length > 0) {
      const formattedSuggestions = data.suggestions.map(s => ({
        id: generateId(),
        ...s
      }));
      io.emit('ai_suggestions', formattedSuggestions);
    }
  } catch (err) {
    console.error('AI Service unreachable:', err.message);
  }
}, config.simulationInterval);

// ─── Start Server ────────────────────────────────────────────
server.listen(config.port, () => {
  console.log(`Backend server running on port ${config.port}`);
});
