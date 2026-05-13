from fastapi import APIRouter
from app.services.bids_service import get_bid_stats, get_bids_per_month, get_awards_per_month
from app.services.merchant_service import get_merchant_stats

router = APIRouter()

@router.get("")
def fetch_stats():
    bids_per_month = get_bids_per_month()
    awards_per_month = get_awards_per_month()
    bid_stats = get_bid_stats()
    merchant_stats = get_merchant_stats()
    return {
        **bid_stats,
        **merchant_stats,
        "bids_per_month": bids_per_month,
        "awards_per_month": awards_per_month
        }