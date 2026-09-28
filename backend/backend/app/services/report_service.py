from datetime import datetime
from ..utils.calculations import progress_percent

def make_report(kpis, user_name):
    lines = [
        "VISION 2030 KPI EXECUTIVE REPORT",
        f"User: {user_name}",
        f"Generated: {datetime.utcnow().isoformat()} UTC",
        ""
    ]
    for k in kpis:
        lines.append(
            f"{k.name}: actual={k.actual}{k.unit}, target={k.target}{k.unit}, "
            f"progress={progress_percent(k.actual,k.target)}%, status={k.status}"
        )
    return "\n".join(lines)
