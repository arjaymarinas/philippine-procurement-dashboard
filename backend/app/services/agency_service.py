from app.db.connection import get_connection
from app.db.queries import (
  GET_TOTAL_AGENCIES
)

def get_agency_stats(year: str = "2025"):

  start_date = f"{year}-01-01"
  end_date = f"{year}-12-31"

  conn = get_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(GET_TOTAL_AGENCIES, (start_date, end_date))
    total_agencies = cursor.fetchone()

    result = {
      "total_agencies": total_agencies[0]
    }

    return result
  finally:
    cursor.close()
    conn.close()