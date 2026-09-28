import json
from sqlalchemy.orm import Session
from ..models import KPI
from ..utils.calculations import get_status

def seed_kpis(db: Session):
    if db.query(KPI).count():
        return
    data = [
        ("Renewable Energy Share", 30, 24, "%", [15,18,22,24]),
        ("Employment Rate", 80, 76, "%", [60,65,71,76]),
        ("Education Access", 90, 88, "%", [55,65,78,88]),
        ("Healthcare Coverage", 85, 91, "%", [62,71,82,91]),
        ("Infrastructure Development", 70, 65, "%", [30,42,55,65]),
    ]
    for name,target,actual,unit,history in data:
        db.add(KPI(name=name,target=target,actual=actual,unit=unit,
                   status=get_status(actual,target),history=json.dumps(history)))
    db.commit()

def serialize_kpi(k: KPI):
    return {
        "id": k.id, "name": k.name, "target": k.target, "actual": k.actual,
        "unit": k.unit, "status": k.status,
        "history": json.loads(k.history or "[]")
    }
