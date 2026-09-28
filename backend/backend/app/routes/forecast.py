from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import KPI
from ..services.forecast_service import forecast_kpi

router = APIRouter(prefix="/api/forecast", tags=["Forecast"])

@router.get("/{kpi_id}")
def forecast(kpi_id: int, db: Session = Depends(get_db)):
    k = db.get(KPI, kpi_id)
    if not k:
        raise HTTPException(404, "KPI not found")
    return forecast_kpi(k)
