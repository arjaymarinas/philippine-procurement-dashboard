import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_dashboard_summary(metrics):

    prompt = f"""
    You are a procurement analytics expert.

    Analyze the procurement dashboard metrics below and generate
    concise executive insights.

    IMPORTANT:
    - Do not invent values
    - Only use provided data
    - Keep response professional
    - Mention trends and observations

    Metrics:
    {metrics}
    """

    response = model.generate_content(prompt)

    return response.text