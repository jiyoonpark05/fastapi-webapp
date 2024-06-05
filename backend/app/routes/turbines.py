from fastapi import APIRouter, HTTPException, status, Query
from bson import ObjectId
from typing import List, Optional, Dict
from datetime import datetime
from app.models import TurbinRecode
from app.database import turbine_collection

router = APIRouter()

def convert_record(record) -> dict:
    return {
        "_id": str(record["_id"]),
        "turbine_id": str(record["turbine_id"]),
        "datetime": str(record["Dat/Zeit"]),
        "wind": {"unit": record["Wind"]["unit"], "value": record["Wind"]["value"]},
        "power":{"unit": record["Leistung"]["unit"], "value": record["Leistung"]["value"]}
    }

@router.get("/",response_model=List[TurbinRecode])
async def get_turbine_record(
    turbine_id: Optional[str] = None,
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None)
):
    try:
        query = {}

        if turbine_id is not None:
            query["turbine_id"] = turbine_id
        
        date_filter = {}
        if start_date:
            date_filter["$gte"] = start_date
        if end_date:
            date_filter["$lte"] = end_date
        if date_filter:
            query["Dat/Zeit"] = date_filter
        
        turbine_records = await turbine_collection.find(query).sort([("Wind.value", 1)]).to_list(length=None)
        return [convert_record(turbine_record) for turbine_record in turbine_records]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



    
