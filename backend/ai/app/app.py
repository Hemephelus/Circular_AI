from flask import Flask, request, jsonify, abort
from services import prompts, vector_search, query_list

app = Flask("__name__")

@app.route("/v1", methods=["POST"])
def predict():
    if not request.is_json:
        abort(400, description="Invalid request format: expected JSON.")

    data = request.get_json()
    query = data.get("user_message")
    
    if not query:
        abort(400, description="Missing 'user_message' in request.")

    try:
        related_query_list = query_list.generate_queries(query)
        retrieved_doc = vector_search.retrieve_query(related_query_list)
        # print(retrieved_doc)
    except Exception as e:
        app.logger.error("Error retrieving document: %s", e)
        abort(500, description="Failed to retrieve document for the provided query.")
    
    try:
        llm_response = prompts.get_response(query, retrieved_doc)
    except Exception as e:
        app.logger.error("Error generating response: %s", e)
        abort(500, description="Failed to generate response based on the retrieved document.")

    return jsonify({"response": llm_response})

if __name__=="__main__":
    app.run()
