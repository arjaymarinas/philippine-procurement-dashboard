from app.db.connection import get_connection
from app.db.queries import GET_TOTAL_BIDS_ABC, GET_TOTAL_AWARD_CA, GET_BIDS_PER_MONTH, GET_AWARDS_PER_MONTH

def get_bid_stats():
    conn = get_connection()
    cursor = conn.cursor()

    try:

      cursor.execute(GET_TOTAL_BIDS_ABC)
      bid_posted = cursor.fetchone()

      cursor.execute(GET_TOTAL_AWARD_CA)
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

def get_bids_per_month():
  conn = get_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(GET_BIDS_PER_MONTH)
    result = cursor.fetchall()
    return result
  finally:
    cursor.close()
    conn.close()

def get_awards_per_month():
  conn = get_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(GET_AWARDS_PER_MONTH)
    result = cursor.fetchall()
    return result
  finally:
    cursor.close()
    conn.close()
  
    