from pydantic import BaseModel, Field
from typing import Optional 
from datetime import datetime

class UnitValue(BaseModel):
    unit: str
    value: str

class TurbinRecode(BaseModel):
    id: str = Field(alias="_id")
    turbine_id: str
    datetime: datetime
    wind : UnitValue
    power: UnitValue