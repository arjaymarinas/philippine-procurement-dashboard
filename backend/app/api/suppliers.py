from fastapi import APIRouter
from app.services.supplier_service import get_all_suppliers

router = APIRouter()

@router.get("/")
def fetch_suppliers():
    return get_all_suppliers()