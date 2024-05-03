import chromadb
import pandas as pd
import google.generativeai as genai
from chromadb import Documents, EmbeddingFunction, Embeddings

class GeminiEmbeddingFunction(EmbeddingFunction):
    def __init__(self, task="retrieval_document", gemini_embedding_model='models/embedding-001', title="Custom query"):
        self.task = task
        self.gemini_embedding_model = gemini_embedding_model
        self.title = title
    
    def __call__(self, input: Documents) -> Embeddings:
        return genai.embed_content(model=self.gemini_embedding_model,
                                    content=input,
                                    task_type=self.task,
                                    title=self.title)["embedding"]

    @classmethod
    def create_chroma_db(cls, df, name="cbn_circulars", metadatas_mapping=None, field_mapping=None):
        if metadatas_mapping is None:
            # default mapping for metadata fields if not provided
            metadatas_mapping = {
                "source": "document",
                "date": "timestamp"
            }

        if field_mapping is None:
            # default dataframe field mapping if not provided. The values should exist in the provided df
            field_mapping = {
                "documents": "text",
                "ids": "_id"
            }


        chroma_client = chromadb.Client()
        db = chroma_client.create_collection(name=name, embedding_function=GeminiEmbeddingFunction())

        for i, row in df.iterrows():
            # Extract metadata, document, and ids data from the dataframe row
            metadata_data = {meta_field: row[df_col] for meta_field, df_col in metadatas_mapping.items()}
            document_data = {meta_field: row[df_col] for meta_field, df_col in field_mapping.items()}
            # document_data = {doc_field: row[df_col] for doc_field, df_col in documents_mapping.items()}
            # ids_data = {ids_field: row[df_col] for ids_field, df_col in ids_mapping.items()}
            
            # Merge all data dictionaries
            document_data["metadatas"]=metadata_data

            # print(document_data)
            
            # Add document to the ChromaDB
            db.add(**document_data)

        return db


