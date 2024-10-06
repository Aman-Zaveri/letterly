from flask import Flask, request
from flask_cors import CORS
import os
from docx import Document

from utils import generate_text, save_file

app = Flask(__name__)
CORS(app)


@app.route("/generate", methods=["POST"])
def create_cover_letter():
    data = request.json
    position = data.get("position")
    company = data.get("company")
    description = data.get("description")

    try:
        document_name = f"{company} {position} Cover Letter".replace("/", " or ")

        if not os.path.exists(f"cover_letters/{document_name}.pdf"):
            document = Document("template.docx")
            print("Created document")
            output = generate_text(company, position, description)
            if output:
                print("Generated text")
                save_file(document=document, document_name=document_name, output=output)
                print("Saved file")
            else:
                return {
                    "error": "An error occurred while generating the cover letter"
                }, 500
            return {"message": "Successfully created cover letter"}, 200
        return {"error": "Cover letter already exists"}, 500
    except Exception as e:
        return {
            "error": f"An error occurred while generating the cover letter: {e}"
        }, 500
    # return cover_letter


if __name__ == "__main__":
    app.run(debug=True)
