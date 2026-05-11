from fastapi import FastAPI
from app.core.cors import add_cors
from app.api.dashboard import router as dashboard_router

app = FastAPI(title="Procurement Insights API")

# enable CORS
add_cors(app)

# register routes
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])