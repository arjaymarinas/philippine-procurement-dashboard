from app.db.connection import get_connection
from app.db.queries import GET_SUPPLIERS_QUERY

def get_all_suppliers():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(GET_SUPPLIERS_QUERY)
    rows = cursor.fetchall()

    #suppliers = [
      #  {"supplier_id": r[0], "supplier_name": r[1]}
       # for r in rows
    #]

    cursor.close()
    conn.close()

    return rows