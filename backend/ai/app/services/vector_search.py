from config.utils import GeminiEmbeddings
from config.env_var import EnvVariable
from pinecone import Pinecone, ServerlessSpec

try:
    PINECONE_KEY = EnvVariable.PINECONE_KEY.value
    AICX_SEARCH_INDEX = EnvVariable.PINECONE_INDEX.value
    cloud = EnvVariable.CLOUD.value
    region = EnvVariable.REGION.value
    NAMESPACE = EnvVariable.NAMESPACE.value
except AttributeError:
    raise ValueError("One or more required environment variables are missing or incorrectly configured.")

spec = ServerlessSpec(cloud=cloud, region=region)

try:
    pc = Pinecone(api_key=PINECONE_KEY)
except Exception as e:
    raise ConnectionError("Failed to connect to Pinecone service: {}".format(e))

try:
    index = pc.Index(AICX_SEARCH_INDEX)
    # index.describe_index_stats()
except Exception as e:
    raise RuntimeError("Failed to initialize or describe the Pinecone index: {}".format(e))

gmd = GeminiEmbeddings()

def retrieve_query(query):
    if not isinstance(query, str) or not query:
        raise ValueError("Query must be a non-empty string.")

    try:
        vector = gmd.embed(query)
    except Exception as e:
        raise RuntimeError("Failed to generate embeddings: {}".format(e))
    
    try:
        results = index.query(
            namespace=NAMESPACE,
            vector=vector,
            top_k=1,
            include_metadata=True
        )['matches']
    except Exception as e:
        raise RuntimeError("Query execution failed: {}".format(e))

    retrieved_doc = ''
    for i, result in enumerate(results):
        retrieved_doc += '\n\n\n SOURCE DOCUMENT \n\n'
        retrieved_doc += ' ' + result['metadata']['text'] + result['metadata']['source']+ result['metadata']['date']
    return retrieved_doc
