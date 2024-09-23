from flask import Flask, request
from flask_cors import CORS
import os
from docx import Document

from utils import generate_text, save_file

app = Flask(__name__)
CORS(app)


@app.route("/generate_cover_letter", methods=["POST"])
def create_cover_letter():
    data = request.json
    position = data.get("position")
    organization = data.get("organization")
    description = data.get("description")
    print("This is running")

    try:
        document_name = f"{organization} {position} Cover Letter".replace("/", " or ")

        if not os.path.exists(f"cover_letters/{document_name}.pdf"):
            document = Document("template.docx")
            output = generate_text(organization, position, description)
            save_file(document=document, document_name=document_name, output=output)
            return {"message": "Successfully created cover letter"}, 200
        return {"message": "Cover letter already exists"}, 200
    except Exception as e:
        return {"error": f"An error occurred while generating the cover letter: {e}"}, 500
    # return cover_letter


if __name__ == "__main__":
    app.run(debug=True)
