from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json
from ..database import get_db
from ..models import KPI
from ..schemas import KPIResponse, KPIUpdate
from ..services.kpi_service import serialize_kpi
from ..utils.calculations import get_status

router = APIRouter(prefix="/api/kpis", tags=["KPIs"])

@router.get("", response_model=list[KPIResponse])
def get_kpis(db: Session = Depends(get_db)):
    return [serialize_kpi(k) for k in db.query(KPI).order_by(KPI.id).all()]

@router.get("/{kpi_id}", response_model=KPIResponse)
def get_kpi(kpi_id: int, db: Session = Depends(get_db)):
    k = db.get(KPI, kpi_id)
    if not k:
        raise HTTPException(404, "KPI not found")
    return serialize_kpi(k)

@router.patch("/{kpi_id}", response_model=KPIResponse)
def update_kpi(kpi_id: int, payload: KPIUpdate, db: Session = Depends(get_db)):
    k = db.get(KPI, kpi_id)
    if not k:
        raise HTTPException(404, "KPI not found")
    history = json.loads(k.history or "[]")
    history.append(payload.actual)
    k.actual = payload.actual
    k.history = json.dumps(history[-12:])
    k.status = get_status(k.actual, k.target)
    db.commit()
    db.refresh(k)
    return serialize_kpi(k)
