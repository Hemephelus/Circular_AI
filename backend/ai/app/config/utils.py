from time import sleep
from config.env_var import EnvVariable
import google.generativeai as genai

API_KEY=EnvVariable.GEMINI_API_KEY.value

genai.configure(api_key=API_KEY)

class GeminiEmbeddings:
    def __init__(self, task="retrieval_document", gemini_embedding_model='models/text-embedding-004', title="Custom query"):
        self.task = task
        self.gemini_embedding_model = gemini_embedding_model
        self.title = title

    
    def embed(self, input):
        if isinstance(input, str):
            input = input.replace("\n", " ")
            return genai.embed_content(model=self.gemini_embedding_model,
                                    content=input,
                                    task_type=self.task,
                                    title=self.title)["embedding"]

        elif isinstance(input, list):
            embedding = []
            for text in input:
                text = text.replace("\n", " ")
                embedding.append(genai.embed_content(model=self.gemini_embedding_model,
                                    content=text,
                                    task_type=self.task,
                                    title=self.title)["embedding"])
            return embedding

        raise ValueError("Data type not allowed: Expected 'str' or 'list' type.")

    
# Write a string to a text file
def write_to_file(file_path, content):
    with open(file_path, 'w') as file:
        file.write(content)

# Read the content of a text file into a variable
def read_from_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()