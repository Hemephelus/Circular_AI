import pytesseract
import cv2
import re
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

pytesseract.pytesseract.tesseract_cmd = "/usr/local/Cellar/tesseract/5.3.4_1/bin/tesseract"

tessdata_dir_config = r'--tessdata-dir "/usr/local/Cellar/tesseract/5.3.4_1/share/tessdata/"'

class TextRecognizer():
    '''
    Recognize and extract texts in Images
    '''

    def recognize_img(self, img_path):
        try:
            image = cv2.imread(img_path)
            self.extractedInformation = pytesseract.image_to_string(
                image, lang="eng", config=tessdata_dir_config)

            cleaned_text = self.clean_text_with_LLM(self.extractedInformation)
            return cleaned_text
    
        except Exception as e:
            return {"Internal server error: ", e}
    
    def clean_text_with_LLM(self, ocr_text):
        """
        Function to extract the required information from the OCR text using the free and publicly available Gemini 1.0 Pro Python LLM API. 
        This returns a better result. 
        """
        genai.configure(api_key=os.environ.get("API_KEY"))

        model = genai.GenerativeModel('gemini-pro')
        chat = model.start_chat()

        response = chat.send_message(
            f"Fix any possible typos in the text. Do not reword it. \
                ```{ocr_text}```"

        )
        return response.text

    
# if __name__ == '__main__':
#     img_dir = "test_data/screenshots"
#     receipt_images = os.listdir(img_dir) 

#     for r in receipt_images:
#         if os.path.isfile(os.path.join(img_dir, r)) and r.lower().endswith((".jpg", ".jpeg", ".png")):
#             recognise = TextRecognizer(img_path=f"{img_dir}/{r}")
            
#             img, output, extracted_dict_entities = recognise.recognize_img(get_clean_entities_with_LLM=True) # set `get_clean_entities_with_LLM` to True for a better result.
#             '''
#             img: The image object
#             output: The texts extracted from the OCR engine
#             extracted_dict_entities: The "Date", "Items" and "Total Price" extracted from the provided output. 
#             '''
#             # plt.imshow(img)
#             # print("\n")
#             # print(f"Extracted Texts: {output} \n")
#             print("Extracted entities: ", extracted_dict_entities)
#             print("\n\n")


            
