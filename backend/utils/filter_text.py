import re

def filter_text(output: str) -> str:
    # Regular expression to match patterns like [[#]]
    pattern = r"\[\[\d+\]\]"

    # Replace matched patterns with an empty string
    output = re.sub(pattern, "", output)

    start = "Dear Hiring Manager,"
    end = "Aman Zaveri"

    idx1 = output.index(start)
    idx2 = output.index(end)

    final_output = ""

    for idx in range(idx1 + len(start) + 1, idx2):
        final_output += output[idx]
        
    return final_output
