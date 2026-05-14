from fastapi import APIRouter
from app.services.bids_service import (
    get_bid_stats, get_bids_abc_per_month, 
    get_awards_ca_per_month, 
    get_bids_abc_by_classification
)
from app.services.merchant_service import get_merchant_stats

router = APIRouter()

@router.get("")
def fetch_stats():
    bid_stats = get_bid_stats()
    bids_abc_per_month = get_bids_abc_per_month()
    awards_ca_per_month = get_awards_ca_per_month()
    merchant_stats = get_merchant_stats()
    bids_abc_by_classification = get_bids_abc_by_classification()

    return {
        **bid_stats,
        **merchant_stats,
        "bids_abc_per_month": bids_abc_per_month,
        "awards_ca_per_month": awards_ca_per_month,
        "bids_abc_by_classification": bids_abc_by_classification
    }