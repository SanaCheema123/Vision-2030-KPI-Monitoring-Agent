import json
import numpy as np

def forecast_kpi(kpi, periods=4):
    history = json.loads(kpi.history or "[]")
    if not history:
        history = [kpi.actual]
    x = np.arange(len(history))
    y = np.array(history, dtype=float)
    slope = float(np.polyfit(x, y, 1)[0]) if len(history) >= 2 else 0.0
    start = len(history)
    values = [round(float(y[-1] + slope * (i + 1)), 2) for i in range(periods)]
    return {"kpi_id": kpi.id, "history": history, "forecast": values, "slope": round(slope, 3)}
