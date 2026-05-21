from app.services.bids_service import get_bid_stats
from app.services.merchant_service import get_top_10_merchants_by_ca
from app.services.agency_service import get_agency_stats

import google.generativeai as genai

model = genai.GenerativeModel("gemini-2.5-flash")


def answer_procurement_question(question, year):

    # 1. Pull structured data from DB
    bid_stats = get_bid_stats(year)
    top_merchants = get_top_10_merchants_by_ca(year)
    agency_stats = get_agency_stats(year)

    data_context = {
        "bid_stats": bid_stats,
        "top_merchants": top_merchants,
        "agency_stats": agency_stats
    }

    # 2. Ask Gemini to interpret ONLY this data
    prompt = f"""
You are a procurement data analyst.

User question:
{question}

Data:
{data_context}

Rules:
- Only use the provided data
- Do not hallucinate numbers
- Be concise and factual
- If data is insufficient, say so
"""

    response = model.generate_content(prompt)

    return response.text