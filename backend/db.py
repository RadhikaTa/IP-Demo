from sqlalchemy import create_engine

DB_URL = 'CLOUD_URL_OF_DB'

def get_db_connection():
    try:
        engine = create_engine(DB_URL)
        return engine
    except Exception as e:
        print(f"Error: {e}")
        raise
