from time import sleep
from tqdm.auto import tqdm
from config.env_variable import EnvVariable
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
        


# ## Change to Gemini
# def get_search_query(text):
#     query_template = """ Using the text enclosed within the triple backticks generate a semantic search query. Text: ```{}```""".format(text)

#     completion = client.chat.completions.create(
#         model=OPENAI_GPT_DEPLOYMENT,
#         messages=[
#             {"role": "system", "content": "You are an expert in writing search query to enable efficient and accurate data retrieval from a vector database"},
#             {"role": "user", "content": query_template}],
#         temperature=0,
#         max_tokens=200,
#         )
#     try:
#         search_query = completion.choices[0].message.content.split(':')[1]
#     except:
#         search_query = completion.choices[0].message.content
#     return search_query

    def data_prep_pinecone(self, df):
        new_page_map = []
        for i, row in tqdm(df.iterrows()):
            new_page_map.append(
                {'id':row["_id"],
                'text':row["text"],
                'title':row["title"],
                'document': row["document"],
                'date': row["timestamp"]
                }
                )
            # ,
                # 'search query': get_search_query(list(pm[2:])[0])
        return new_page_map


    def upsert_pinecone(self, col, new_data, index, namespace="cbn_circular_v1"):
        batch_size = 5  # how many embeddings we create and insert at once

        for i in tqdm(range(0, len(new_data), batch_size)):
            # find end of batch
            i_end = min(len(new_data), i+batch_size)
            meta_batch = new_data[i:i_end]
            # get ids
            ids_batch = [str(x['id']) for x in meta_batch]
            # get texts to encode
            texts = [x[col] for x in meta_batch]
            # create embeddings (try-except added to avoid RateLimitError)
            try:
                embeds = self.embed(texts)
            except:
                done = False
                while not done:
                    sleep(5)
                    try:
                        embeds = self.embed(texts)
                        done = True
                    except:
                        pass

            # cleanup metadata
            meta_batch = [{
                'title': x['title'],
                'text': x['text'],
                'source': x['document'],
                'date': x['date']
                } for x in meta_batch]

            print(meta_batch[0])
            to_upsert = []
            for j in range(len(meta_batch)):
                to_upsert.append({'id':ids_batch[j], 'values':embeds[j], 'metadata':meta_batch[j]})
            # upsert to Pinecone
            print('to_upsert sample')
            print(to_upsert[0])
            index.upsert(vectors=to_upsert, namespace=namespace)