import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, SessionLocal
from .services.kpi_service import seed_kpis
from .routes import kpis, dashboard, forecast, alerts, insights, reports

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Vision 2030 KPI Monitoring Agent", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(kpis.router)
app.include_router(dashboard.router)
app.include_router(forecast.router)
app.include_router(alerts.router)
app.include_router(insights.router)
app.include_router(reports.router)

@app.on_event("startup")
def startup():
    db = SessionLocal()
    try:
        seed_kpis(db)
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Vision 2030 KPI Monitoring Agent API is running"}

@app.get("/api/health")
def health():
    return {"status": "ok"}
