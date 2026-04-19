from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Store history for predictive analysis
# Format: { 'zone_id': [(timestamp, headcount), ...] }
zone_history = {}

@app.route('/analyze', methods=['POST'])
def analyze_zones():
    data = request.json
    zones = data.get('zones', [])
    
    alerts = []
    suggestions = []
    
    hot_zone = None
    cool_zone = None
    highest_density = 0
    lowest_density = 100
    
    for zone in zones:
        density = zone['current_headcount'] / zone['capacity']
        
        # Track for rotation suggestions
        if density > highest_density:
            highest_density = density
            hot_zone = zone
        if density < lowest_density:
            lowest_density = density
            cool_zone = zone
            
        # Threshold Alerts
        if density >= 1.0:
            alerts.append({
                'zone': zone['name'],
                'severity': 'ALERT',
                'message': f"{zone['name']} is overcrowded at {int(density*100)}% capacity!"
            })
        elif density >= 0.9:
            alerts.append({
                'zone': zone['name'],
                'severity': 'WARN',
                'message': f"{zone['name']} has reached critical capacity ({int(density*100)}%)"
            })
            
        # Predictive Analysis (Simple rate of change)
        rate_of_change = zone.get('entry_rate', 0) - zone.get('exit_rate', 0)
        if rate_of_change > 5 and density > 0.6:
            # Estimate time to full
            remaining_cap = zone['capacity'] - zone['current_headcount']
            mins_to_full = remaining_cap / rate_of_change if rate_of_change > 0 else 999
            
            if mins_to_full < 15:
                alerts.append({
                    'zone': zone['name'],
                    'severity': 'INFO',
                    'message': f"Predictive: {zone['name']} may reach capacity in ~{int(mins_to_full)} minutes"
                })
                
    # Zone Balancing Suggestions
    if hot_zone and cool_zone and highest_density > 0.85 and lowest_density < 0.5:
        suggestions.append({
            'priority': 'High',
            'action': f"Redirect crowd from {hot_zone['name']} to {cool_zone['name']} (currently at {int(lowest_density*100)}% capacity)",
            'zone': hot_zone['name']
        })
        
    return jsonify({
        'alerts': alerts,
        'suggestions': suggestions
    })

if __name__ == '__main__':
    app.run(port=5000)
