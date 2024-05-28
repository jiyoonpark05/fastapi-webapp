from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import turbines

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(turbines.router, prefix="/turbines", tags=["Turbines"])

@app.get("/", tags=["Root"])
async def read_root():
    return {"msg":"hello world"}
