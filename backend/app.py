from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    search_query = request.args.get('search_query', default='', type=str)
    page = request.args.get('page', default=1, type=int)
    limit = 100
    offset = (page - 1) * limit

    conn = None
    conn_obj = None
    cur = None

    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500

        conn_obj = conn.raw_connection()
        cur = conn_obj.cursor()

        if search_query:
            search_term = f"%{search_query.lower()}%"
            query = """
                SELECT "dlr_cd", "part_no", "predicted_today", "predicted_tomorrow",
                       "predicted_weekly", "predicted_monthly", "prediction_date"
                FROM part_purchase_forecast2
                WHERE LOWER("part_no") LIKE %s OR LOWER("dlr_cd") LIKE %s
                LIMIT %s OFFSET %s
            """
            params = (search_term, search_term, limit, offset)
        else:
            query = """
                SELECT "dlr_cd", "part_no", "predicted_today", "predicted_tomorrow",
                       "predicted_weekly", "predicted_monthly", "prediction_date"
                FROM part_purchase_forecast2
                LIMIT %s OFFSET %s
            """
            params = (limit, offset)

        cur.execute(query, params)
        inventory_data = cur.fetchall()

        # Total count
        if search_query:
            cur.execute("""
                SELECT COUNT(*) FROM part_purchase_forecast2
                WHERE LOWER("part_no") LIKE %s OR LOWER("dlr_cd") LIKE %s
            """, (search_term, search_term))
        else:
            cur.execute("SELECT COUNT(*) FROM part_purchase_forecast2")

        total_count = cur.fetchone()[0]

    except Exception as e:
        logging.exception("Error fetching inventory")
        return jsonify({"error": str(e)}), 500
    finally:
        if cur:
            cur.close()
        if conn_obj:
            conn_obj.close()

    return jsonify({
        'inventory': [{
            'dlr_cd': row[0],
            'part_no': row[1],
            'predicted_today': row[2],
            'predicted_tomorrow': row[3],
            'predicted_weekly': row[4],
            'predicted_monthly': row[5],
            'prediction_date': row[6]
        } for row in inventory_data],
        'total_count': total_count,
        'page': page
    })

if __name__ == '__main__':
    app.run(debug=True)
