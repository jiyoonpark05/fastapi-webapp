from fastapi import FastAPI

app = FastAPI()

@app.get("/", tags=["Root"])
async def read_root():
    return {"msg":"hello world"}

# 2. Add FastAPI EndpointAdd an FastAPI endpoint that allows to retrieve the data based on turbine id and time ranges