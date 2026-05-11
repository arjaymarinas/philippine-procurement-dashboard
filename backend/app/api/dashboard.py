from fastapi import APIRouter
from app.services.bids_service import get_bid_stats
from app.services.merchant_service import get_merchant_stats

router = APIRouter()

@router.get("")
def fetch_bids():
    stats = get_bid_stats()
    merchant_stats = get_merchant_stats()
    return {**stats, **merchant_stats}