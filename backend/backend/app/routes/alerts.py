from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import KPI
from ..services.risk_service import risk_from_kpi

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])

@router.get("")
def alerts(db: Session = Depends(get_db)):
    return [risk_from_kpi(k) for k in db.query(KPI).order_by(KPI.id).all()]
