from app.db.connection import get_connection
from app.db.queries import GET_TOTAL_ACTIVE_MERCHANT, GET_TOTAL_PLATINUM_MERCHANT, GET_TOP_10_MERCHANTS_BY_CA

def get_merchant_stats():
    conn = get_connection()
    cursor = conn.cursor()

    try:

      cursor.execute(GET_TOTAL_ACTIVE_MERCHANT)
      total_active_merchant = cursor.fetchone()

      cursor.execute(GET_TOTAL_PLATINUM_MERCHANT)
      total_platinum_merchant = cursor.fetchone()

      result = {
        "merchants": {
          "total_active_merchant": total_active_merchant[0],
          "total_platinum_merchant": total_platinum_merchant[0],
        }
      }

      return result
      
    finally:
      cursor.close()
      conn.close()

def get_top_10_merchants_by_ca():
    conn = get_connection()
    cursor = conn.cursor()

    try:
      cursor.execute(GET_TOP_10_MERCHANTS_BY_CA)
      result = cursor.fetchall()
      return result
    finally:
      cursor.close()
      conn.close()