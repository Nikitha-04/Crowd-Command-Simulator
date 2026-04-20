# 🎯 CrowdCommand — Real-Time Crowd Management System

An AI-driven crowd management platform featuring real-time density monitoring, dynamic wayfinding, gamified training simulation, and instant incident response.

---

## 📁 Project Structure

```
project-root/
│
├── frontend/                # React (Vite) app
│   ├── api/               # Vercel Serverless Functions
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   └── store/         # Zustand state management
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Node.js (Express + Socket.io) API
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database schemas
│   │   ├── middleware/     # Auth, error handling
│   │   ├── services/      # External logic (AI calls, simulator)
│   │   ├── utils/         # Helper functions
│   │   └── app.js         # Main server entry point
│   ├── config/            # Server configuration
│   ├── .env
│   └── package.json
│
├── ai-service/            # Python AI microservice (Flask)
│   ├── app.py             # Flask server
│   ├── requirements.txt
│   ├── models/            # ML models
│   └── services/          # AI analysis logic
│
├── docs/                  # Documentation
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.9+
- npm

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`

### 2. Backend
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:4000`

### 3. AI Service
```bash
cd ai-service
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py
```
Runs on `http://localhost:5000`

---

## ✨ Features

- **Real-Time Heatmap** — Live crowd density visualization
- **AI Anomaly Detection** — Predictive alerts for surges
- **Dynamic Wayfinding** — GPS routing to safe zones via Leaflet maps
- **Gamified Training** — Interactive crowd navigation simulator
- **Incident Reporting** — Direct viewer-to-organizer emergency bridge
- **Role-Based Access** — Organizer and Viewer dashboards

---

## 🛠 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React, Vite, TailwindCSS, Zustand  |
| Backend     | Node.js, Express, Socket.io        |
| AI Service  | Python, Flask                       |
| Maps        | Leaflet, React-Leaflet             |
| Deployment  | Vercel (Frontend + API)             |

---

## 📄 License

MIT
