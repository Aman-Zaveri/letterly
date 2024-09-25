import os
from docx2pdf import convert
from docx.shared import Pt
import pythoncom

def save_file(document, document_name, output):
    generated_text = document.add_paragraph().add_run(
        f"""Dear Hiring Manager,
        
{output}

Aman Zaveri"""
    )

    generated_text.font.size = Pt(11)
    generated_text.font.name = "Garamond"

    try:
        document.save(f"{document_name}.docx")
        os.rename(f"{document_name}.docx", f"cover_letters/{document_name}.docx")
        
        # Initialize COM before calling the convert function
        pythoncom.CoInitialize()

        convert(f"cover_letters/{document_name}.docx")

        # Uninitialize COM after conversion
        pythoncom.CoUninitialize()

        os.remove(f"cover_letters/{document_name}.docx")
    except Exception as e:
        print(e)
        print("Error in renaming or converting file")
