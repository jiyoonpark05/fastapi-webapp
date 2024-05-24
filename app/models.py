from pydantic import BaseModel, Field
from typing import Optional 

class UnitValue(BaseModel):
    unit: str
    value: str

class Turbin(BaseModel):
    _id: str
    turbine_id: str
    datetime: datetime
    wind : UnitValue
    power: UnitValue