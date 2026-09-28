def progress_percent(actual: float, target: float) -> float:
    if target == 0:
        return 0.0
    return round((actual / target) * 100, 2)

def get_status(actual: float, target: float) -> str:
    if target == 0:
        return "On Track"
    ratio = actual / target
    if ratio >= 0.95:
        return "On Track"
    if ratio >= 0.80:
        return "At Risk"
    return "Below Target"

def gap(actual: float, target: float) -> float:
    return round(actual - target, 2)
