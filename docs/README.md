# CrowdCommand Documentation

## Architecture Overview

CrowdCommand uses a three-tier architecture:

1. **Frontend (React + Vite)** — Handles the user interface, including the Organizer Dashboard, Viewer Dashboard, and the gamified Inside View simulator.

2. **Backend (Node.js + Express + Socket.io)** — Manages real-time WebSocket connections, zone simulation, and incident management.

3. **AI Service (Python + Flask)** — Analyzes crowd density data and generates alerts and suggestions using threshold-based and predictive algorithms.

## API Endpoints

### Zones
- `GET /api/zones` — Returns current zone density data

### Incidents
- `GET /api/incidents` — Lists all active incidents
- `POST /api/incidents` — Reports a new incident
- `PATCH /api/incidents/:id` — Updates an incident's status

## WebSocket Events

| Event              | Direction       | Description                        |
|--------------------|----------------|------------------------------------|
| `zone_update`      | Server → Client | Updated zone data (every 5s)       |
| `new_alert`        | Server → Client | AI-generated alert                 |
| `ai_suggestions`   | Server → Client | AI crowd balancing suggestions     |
| `emergency`        | Server → Client | Emergency declaration              |
| `trigger_panic`    | Client → Server | Organizer triggers emergency       |
| `report_incident`  | Client → Server | Viewer reports an incident         |
| `new_incident`     | Server → Client | Broadcast new incident to all      |
| `incident_updated` | Server → Client | Incident status change broadcast   |
