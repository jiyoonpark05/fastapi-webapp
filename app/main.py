from fastapi import FastAPI
from app.routes import turbines

app = FastAPI()

app.include_router(turbines.router, prefix="/turbines", tags=["Turbines"])

@app.get("/", tags=["Root"])
async def read_root():
    return {"msg":"hello world"}
