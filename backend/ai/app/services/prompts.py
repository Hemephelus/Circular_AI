import google.generativeai as genai
from config.env_var import EnvVariable

try:
    API_KEY = EnvVariable.GEMINI_API_KEY.value
except AttributeError:
    raise ValueError("API key is missing or incorrectly configured in environment variables.")

genai.configure(api_key=API_KEY)

try:
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    raise ConnectionError("Failed to configure the Generative Model: {}".format(e))

def get_response(query, relevant_doc):
    if not isinstance(query, str) or not query:
        raise ValueError("Query must be a non-empty string.")
    if not isinstance(relevant_doc, str):
        raise ValueError("Relevant document must be a string.")
    
    prompt = ("""You are a helpful and informative bot that answers questions relating the policies and circular released by the Central Bank of Nigeria (CBN) betwwen October 2023 till present, April 2024. 
  Know that Mr. Olayemi Cardoso is the Governor of the Central Bank of Nigeria (CBN). He commenced his tenure on October 5, 2023.

  So you are to use the text from the reference passage included below. \
  Be sure to respond in a complete sentence, being comprehensive, including all relevant background information and reference URLs. \
  However, you are talking to a non-technical audience, so be sure to break down complicated concepts and \
  strike a friendly and converstional tone. \
  If the passage is irrelevant to the answer, you may ignore it.
  QUESTION: '{query}'
  PASSAGE: '{relevant_doc}'

    ANSWER:
  """).format(query=query, relevant_doc=relevant_doc)
    
    try:
        answer = model.generate_content(prompt)
    except Exception as e:
        raise RuntimeError("Failed to generate content from model: {}".format(e))
    
    return answer.text
