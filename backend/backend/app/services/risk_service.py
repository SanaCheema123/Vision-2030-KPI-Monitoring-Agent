def risk_from_kpi(k):
    level = {"Below Target": "High", "At Risk": "Medium", "On Track": "Low"}[k.status]
    message = {
        "High": f"{k.name} is significantly below its target.",
        "Medium": f"{k.name} is close to the risk threshold.",
        "Low": f"{k.name} is currently meeting its target."
    }[level]
    return {"kpi_id": k.id, "title": k.name, "level": level, "message": message}
