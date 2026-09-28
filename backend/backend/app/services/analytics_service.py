from ..utils.calculations import progress_percent, gap

def kpi_analysis(k):
    return {
        "id": k.id, "name": k.name, "target": k.target, "actual": k.actual,
        "progress": progress_percent(k.actual, k.target),
        "gap": gap(k.actual, k.target), "status": k.status
    }
