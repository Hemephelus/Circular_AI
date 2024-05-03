# Circular AI

## Inspiration
The Central Bank of Nigeria (CBN) is the country's apex bank regulating financial institutions. Since the tenure of the current CBN governor, there have been persistent changes in policies and sometimes these policies are hard to interpret especially in terms of how this affects the monetary transactions of an average Nigerian. In most cases, people resort to social media to ask other people positioned as financial leaders to explain the implications of certain policies. To drive inclusion, this project aims to tackle this problem that affects an average banked Nigerian.

## What it does
Circular AI is a chatbot that provides a detailed explanation of any existing CBN policy that was released during the tenure of the current CBN governor, which is between October 2023 to April 2024.

For Example: 
> **User:** What is the latest policy on BDC?

> **Circular AI:** The Central Bank of Nigeria (CBN) has revoked the operational licenses of 4,173 Bureaux De Change (BDC) operators, effective March 1, 2024. This decision is part of the CBN's ongoing efforts to revise the regulatory and supervisory guidelines for BDC operations in the country. The affected BDC operators failed to comply with various regulatory provisions, including payment of fees, rendition of returns, and compliance with AML, CFT, and CPF regulations. The revised guidelines will be mandatory for all stakeholders in the sector once they become effective. Visit the CBN website, www.cbn.gov.ng for more information.

## How we built it
The development of this product has five major phases:

**Data Collection and Preparation**
- We used a nodejs-based web scraper to get all the URLs to CBN policies from [the CBN site](https://cbn.gov.ng/documents/policycirculars.asp/) between the time range of Oct 2023 to April 2024.

- Further cleaning was done such as removing all files which had any of the following keywords in their titles: ['vol', 'volume', 'meeting', 'Report', 'Act', 'A4', 'Publication', 'half-year', 'bullion', 'calendar', 'qtr', 'annual', 'quarter', 'remark', 'speech', 'letter', 'ECR', 'Analysis', 'weekly']

- After filtering out irrelevant documents, we downloaded the PDFs using their respective URLs and converted them all to PNG format. This conversion was necessary to address cases where documents were scanned as PDFs but did not retain true PDF formatting. Subsequently, we extracted text from these images using OCR, specifically pytesseract, a Python wrapper for the Tesseract engine. 

- In our OCR script, we incorporated an extra text cleaning step to enhance accuracy. We utilized the Gemini 1.5 Pro LLM tool to address any incomplete text extractions, a common issue in OCR processes The following prompt was used to maintain the integrity of the policy texts:
```
f"Fix any possible typos in the text. Do not reword it.```{ocr_text}```”
```

**Vector Embeddings and Vector Search**

The texts were converted to vectors using the “text-embedding-004” Gemini 1.5 Pro model. These embedded texts are pushed to Pinecone, a vector database. Pinecone was selected because of the speed and flexibility that it offers. 

Based on the vectors, when a user sends in a query, the query is converted to vectors using the Gemini embedding model, and with that, a vector search is used to retrieve the most similar document to the user query.

**Prompt Engineering and Response Generation**

This stage uses the Gemini text generator model, “Gemini-pro” to generate a response to the user based on their query and the retrieved document. It also ensures that the query is related to CBN policies before responding. This is to ensure that the bot is used for the intended purpose.

**API Development**

The API was developed using Flask. This API endpoint takes in the user query and returns a response. Error handling was also included
to manage possible errors such as connection failure with Pinecone or Gemini.

**Frontend Development**
- We used React.js to build the chatbot website for Circular AI.
- The user provides a prompt to enquire about an existing CBN policy and Circular AI returns a response that aligns with the user's query.

## Challenges we ran into
- **Prompt Engineering** 
  - Fine-tuning the LLM response to provide the expected and accurate output.
- **Data cleaning**
    - Removing irrelevant PDF files that didn't contain CBN policies
- Addressing Egde cases like when a user uploads irrelevant questions to the chatbot

## Accomplishments that we're proud of
- We achieved our goal which was to create a chatbot that simplifies the meaning and implication of existing CBN policies.

## What we learned
1. Few-shot prompts engineering greatly improves LLM performance.
2. We learnt about the embedding models that google generative AI provides by following the GitHub [cookbook](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Embeddings.ipynb) 
3. We learnt about the importance of clean data. The experience of sorting the collected data and cleaning the policy documents was a major phase.

## What's next for Circular AI
- To create awareness of the product to more users
- To add the following features:
  - Ability to provide a URL of a CBN policy to the chatbot and get a simplified explanation of the policy.
  - To add a chat history feature that allows the chatbot to remember previous conversation with the user.


