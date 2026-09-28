from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from .database import Base

class KPI(Base):
    __tablename__ = "kpis"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    target = Column(Float, nullable=False)
    actual = Column(Float, nullable=False)
    unit = Column(String(50), default="%")
    status = Column(String(50), default="Below Target")
    history = Column(Text, default="[]")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    kpi_id = Column(Integer, nullable=False)
    title = Column(String(200), nullable=False)
    level = Column(String(30), nullable=False)
    message = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
