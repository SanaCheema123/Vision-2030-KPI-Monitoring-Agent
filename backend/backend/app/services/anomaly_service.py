import json
import numpy as np

def detect_anomaly(kpi):
    history = json.loads(kpi.history or "[]")
    if len(history) < 3:
        return {"is_anomaly": False, "message": "Not enough history."}
    arr = np.array(history, dtype=float)
    mean, std = arr.mean(), arr.std()
    if std == 0:
        return {"is_anomaly": False, "message": "Stable trend."}
    z = abs((arr[-1] - mean) / std)
    return {"is_anomaly": bool(z >= 2), "z_score": round(float(z), 2),
            "message": "Unusual recent change detected." if z >= 2 else "No major anomaly detected."}
