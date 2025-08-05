from sqlalchemy import create_engine

DB_URL = 'postgresql://postgres:Interra-it.95@partsinvdb.cne8gyi0q0wh.us-west-1.rds.amazonaws.com:5432/inital_db'

def get_db_connection():
    try:
        engine = create_engine(DB_URL)
        return engine
    except Exception as e:
        print(f"Error: {e}")
        raise
