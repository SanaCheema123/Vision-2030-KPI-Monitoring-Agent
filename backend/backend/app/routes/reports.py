from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import KPI
from ..schemas import ReportRequest
from ..services.report_service import make_report

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.post("")
def report(payload: ReportRequest, db: Session = Depends(get_db)):
    return {"report": make_report(db.query(KPI).order_by(KPI.id).all(), payload.user_name)}
