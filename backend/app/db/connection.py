import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_connection():
    # Fetch the connection string from environment variables
    database_url = os.getenv("DATABASE_URL")
    
    if not database_url:
        raise ValueError("DATABASE_URL is not set in the environment or .env file")
    
    # psycopg2 can accept the full connection string directly
    return psycopg2.connect(database_url)