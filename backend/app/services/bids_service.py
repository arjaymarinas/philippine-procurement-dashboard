from app.db.connection import get_connection
from app.db.queries import (
  GET_TOTAL_BIDS_ABC,
  GET_TOTAL_AWARD_CA,
  GET_BIDS_ABC_PER_MONTH,
  GET_AWARDS_CA_PER_MONTH,
  GET_BIDS_ABC_BY_CLASSIFICATION
)

def get_bid_stats(year: str = "2025"):
    conn = get_connection()
    cursor = conn.cursor()

    start_date = f"{year}-01-01"
    end_date = f"{year}-12-31"

    try:

      cursor.execute(GET_TOTAL_BIDS_ABC, (start_date, end_date))
      bid_posted = cursor.fetchone()

      cursor.execute(GET_TOTAL_AWARD_CA, (start_date, end_date))
      award_posted = cursor.fetchone()

      result = {
        "bids": {
          "bid_posted": bid_posted[0],
          "total_abc": float(bid_posted[1] or 0)
        },
        "awards": {
          "award_posted": award_posted[0],
          "total_contract_amount": float(award_posted[1] or 0)
        }
      }

      return result
      
    finally:
      cursor.close()
      conn.close()

def get_bids_abc_per_month(year: str = "2025"):
  conn = get_connection()
  cursor = conn.cursor()

  start_date = f"{year}-01-01"
  end_date = f"{year}-12-31"

  try:
    cursor.execute(GET_BIDS_ABC_PER_MONTH, (start_date, end_date))
    result = cursor.fetchall()
    return result
  finally:
    cursor.close()
    conn.close()

def get_bids_abc_by_classification(year: str = "2025"):
  conn = get_connection()
  cursor = conn.cursor()

  start_date = f"{year}-01-01"
  end_date = f"{year}-12-31"

  try:
    cursor.execute(GET_BIDS_ABC_BY_CLASSIFICATION, (start_date, end_date))
    result = cursor.fetchall()
    return result
  finally:
    cursor.close()
    conn.close()

def get_awards_ca_per_month(year: str = "2025"):
  conn = get_connection()
  cursor = conn.cursor()

  start_date = f"{year}-01-01"
  end_date = f"{year}-12-31"

  try:
    cursor.execute(GET_AWARDS_CA_PER_MONTH, (start_date, end_date))
    result = cursor.fetchall()
    return result
  finally:
    cursor.close()
    conn.close()
  