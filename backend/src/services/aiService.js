// AI Service - Handles communication with the Python AI microservice
const callAIService = async (zones) => {
  const AI_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:5000';
  const response = await fetch(`${AI_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ zones })
  });
  return response.json();
};

module.exports = { callAIService };
