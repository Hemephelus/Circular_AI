import google.generativeai as genai
from config.env_var import EnvVariable
from config.utils import read_from_file

policy_docs_titles = read_from_file("backend/ai/app/config/titles.txt")

try:
    API_KEY = EnvVariable.GEMINI_API_KEY.value
except AttributeError:
    raise ValueError("API key is missing or incorrectly configured in environment variables.")

genai.configure(api_key=API_KEY)

try:
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    raise ConnectionError("Failed to configure the Generative Model: {}".format(e))

def generate_queries(query):
    if not isinstance(query, str) or not query:
        raise ValueError("Query must be a non-empty string.")
    
    prompt = ("""You are a helpful and informative bot for the Central Bank of Nigeria (CBN), which is the apex bank in Nigeria. 
    Customers will ask you certain questions that relate to CBN policies. Your role is to break down the question to align with the topics of all the released policies. This will enable easy search.
        
        Responsibilities: 
        1. Ensure that the customer query is within the context of banking and finances or monetary policies. If it is not, tell the customer to keep the conversation within the context.

        2. For every given query, return a list of the unique questions that can be answered using the provided topics with no additional texts. 
        
        For example, "Explain the latest policy on loan application". Your response should be ["Lending in the banking industry"]
  QUESTION: '{query}'
  TOPICS: '{topics}'

    ANSWER:
  """).format(query=query, topics=policy_docs_titles)
    
    try:
        answer = model.generate_content(prompt)
    except Exception as e:
        raise RuntimeError("Failed to generate content from model: {}".format(e))
    
    # print("Query list: ", answer.text)
    
    return answer.text
