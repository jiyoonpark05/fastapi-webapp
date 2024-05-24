from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from typing import List, Optional, Dict
from datetime import datetime
from app.models import TurbinRecode
from app.database import turbine_collection

router = APIRouter()

# 2. Add FastAPI EndpointAdd an FastAPI endpoint that allows to retrieve the data based on turbine id and time ranges
## todo : turbin cnt (for select option for frontend)

def convert_record(record) -> dict:
    return {
        "_id": str(record["_id"]),
        "turbine_id": str(record["turbine_id"]),
        "datetime": str(record["Dat/Zeit"]),
        "wind": record["Wind"],
        "power": record["Leistung"]
    }

@router.get("/",response_model=List[TurbinRecode])
async def get_turbine_record(
    turbine_id: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    try:
        query = {}

        if turbine_id is not None:
            query["turbine_id"] = turbine_id
        
        if start_date:
            query["Dat/Zeit"] = {"$gte": start_date}
        if end_date:
            query["Dat/Zeit"] = {"$lte": end_date}
        
        turbine_records = await turbine_collection.find(query).to_list(length=10)
        return [convert_record(turbine_record) for turbine_record in turbine_records]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



    
