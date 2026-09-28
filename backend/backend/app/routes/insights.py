from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import KPI
from ..schemas import InsightRequest
from ..utils.calculations import progress_percent

router = APIRouter(prefix="/api/insights", tags=["AI Insights"])

@router.post("")
def insights(payload: InsightRequest, db: Session = Depends(get_db)):
    kpis = db.query(KPI).all()
    weakest = min(kpis, key=lambda k: progress_percent(k.actual,k.target)) if kpis else None
    if not weakest:
        return {"summary": "No KPI data available.", "question": payload.question}
    return {
        "question": payload.question,
        "summary": f"{weakest.name} currently needs the most attention based on target progress.",
        "details": [
            f"{k.name}: {progress_percent(k.actual,k.target)}% of target"
            for k in kpis
        ],
        "source": "Current verified KPI database records"
    }
