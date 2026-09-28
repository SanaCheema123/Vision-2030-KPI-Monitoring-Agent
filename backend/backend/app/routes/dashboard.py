from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import KPI
from ..services.analytics_service import kpi_analysis

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("")
def dashboard(db: Session = Depends(get_db)):
    kpis = db.query(KPI).order_by(KPI.id).all()
    data = [kpi_analysis(k) for k in kpis]
    return {
        "total": len(data),
        "on_track": sum(x["status"]=="On Track" for x in data),
        "at_risk": sum(x["status"]=="At Risk" for x in data),
        "below_target": sum(x["status"]=="Below Target" for x in data),
        "average_progress": round(sum(x["progress"] for x in data)/len(data),2) if data else 0,
        "kpis": data
    }
