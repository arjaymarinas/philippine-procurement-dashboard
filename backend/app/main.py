from fastapi import FastAPI
from app.core.cors import add_cors
from app.api.suppliers import router as suppliers_router

app = FastAPI(title="Procurement Insights API")

# enable CORS
add_cors(app)

# register routes
app.include_router(suppliers_router, prefix="/suppliers", tags=["Suppliers"])