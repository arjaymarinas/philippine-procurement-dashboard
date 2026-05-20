from app.db.connection import get_connection
from app.db.queries import GET_TOTAL_ACTIVE_MERCHANT, GET_TOTAL_PLATINUM_MERCHANT, GET_TOP_10_MERCHANTS_BY_CA, GET_MERCHANT_REGISTRATION

def get_merchant_stats(year: str = None):
    conn = get_connection()
    cursor = conn.cursor()

    try:
      start_date = f"{year}-01-01"
      end_date = f"{year}-12-31"

      #cursor.execute(GET_TOTAL_ACTIVE_MERCHANT)
      #total_active_merchant = cursor.fetchone()

      #cursor.execute(GET_TOTAL_PLATINUM_MERCHANT)
      #total_platinum_merchant = cursor.fetchone()

      cursor.execute(GET_MERCHANT_REGISTRATION, (start_date, end_date, start_date, end_date))
      merchant_registration = cursor.fetchone()

      result = {
        "merchant_stats": {
          "total_registration": merchant_registration[0],
          "total_platinum": merchant_registration[1],
          "total_red": merchant_registration[0] - merchant_registration[1],
        }
      }

      return result
      
    finally:
      cursor.close()
      conn.close()

def get_top_10_merchants_by_ca(year: str = "2025"):
    conn = get_connection()
    cursor = conn.cursor()

    start_date = f"{year}-01-01"
    end_date = f"{year}-12-31"

    try:
      cursor.execute(GET_TOP_10_MERCHANTS_BY_CA, (start_date, end_date))
      result = cursor.fetchall()
      return result
    finally:
      cursor.close()
      conn.close()