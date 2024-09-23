import re
import pyperclip
from g4f.client import Client
from utils.filter_text import filter_text
import constants


def generate_text(organization, job_title, description):
    client = Client()
    output = ""

    while len(output.split()) > 400 or len(output.split()) < 100:

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": f"""{constants.PROMPT}

The output should look like this:
{constants.TEMPLATE}

{constants.RESUME}

Job Information:
Organization: {organization}
Position: {job_title}
Job Description: {description}""",
                }
            ],
        )

        output = filter_text(response.choices[0].message.content)

    pyperclip.copy(output)
    output = output.strip()
    return output
