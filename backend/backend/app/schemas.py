from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class KPIBase(BaseModel):
    name: str
    target: float
    actual: float
    unit: str = "%"

class KPIResponse(KPIBase):
    id: int
    status: str
    history: List[float] = []
    model_config = ConfigDict(from_attributes=True)

class KPIUpdate(BaseModel):
    actual: float

class AlertResponse(BaseModel):
    id: int
    kpi_id: int
    title: str
    level: str
    message: str
    model_config = ConfigDict(from_attributes=True)

class InsightRequest(BaseModel):
    question: Optional[str] = None

class ReportRequest(BaseModel):
    user_name: str = "Executive User"
