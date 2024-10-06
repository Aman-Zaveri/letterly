import re


def filter_text(output: str) -> str:
    # Regular expression to match patterns like [[#]]
    pattern = r"\[\[\d+\]\]"

    # Replace matched patterns with an empty string
    output = re.sub(pattern, "", output)
    
    # Replace all \n with two newline characters
    # output = output.replace("\n", "\n\n")

    # Define start and end markers
    start = "Dear Hiring Manager,"
    end = "Aman Zaveri"

    # Use .find() to safely check for the existence of the start and end
    idx1 = output.find(start)
    idx2 = output.find(end)

    # If either marker is not found, return the cleaned text without extraction
    if idx1 == -1 or idx2 == -1:
        print(f"Could not find the start ({start}) or end ({end}) markers.")
        return output.strip()  # Return the full cleaned output if no match

    # Extract the text between the start and end markers
    final_output = output[idx1 + len(start) + 1 : idx2]

    print(f"Extracted text: {final_output}")
    return final_output.strip()
