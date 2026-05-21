from fastapi import APIRouter

from app.services.bids_service import get_bid_stats
from app.services.merchant_service import get_merchant_stats
from app.services.agency_service import get_agency_stats
from app.services.ai_service import generate_dashboard_summary

router = APIRouter()

@router.get("")
def fetch_ai_summary(year: str = None):

    bid_stats = get_bid_stats(year)
    merchant_stats = get_merchant_stats(year)
    agency_stats = get_agency_stats(year)

    summary = generate_dashboard_summary({
        "year": year,
        "bid_stats": bid_stats,
        "merchant_stats": merchant_stats,
        "agency_stats": agency_stats
    })

    return {
        "ai_summary": summary
    }