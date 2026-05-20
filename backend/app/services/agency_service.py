from app.db.connection import get_connection
from app.db.queries import (
  GET_TOTAL_AGENCIES
)

def get_agency_stats(year: str = "2025"):
  conn = get_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(GET_TOTAL_AGENCIES, (year,))
    total_agencies = cursor.fetchone()

    result = {
      "total_agencies": total_agencies[0]
    }

    return result
  finally:
    cursor.close()
    conn.close()