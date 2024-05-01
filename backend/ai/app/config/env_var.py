from enum import Enum
from dotenv import load_dotenv
import os

load_dotenv()

class EnvVariable(Enum):
    GEMINI_API_KEY=os.environ.get("API_KEY")
    PINECONE_KEY=os.environ.get("PINECONE_KEY")
    PINECONE_INDEX=os.environ.get("AICX_SEARCH_INDEX")
    CLOUD = os.environ.get("PINECONE_CLOUD_SERVICE")
    REGION = os.environ.get("PINECONE_CLOUD_REGION")
    NAMESPACE = os.environ.get("NAMESPACE")