from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import google.generativeai as genai

# Load Gemini API key
gemini_api_key = os.environ.get("GOOGLE_API_KEY")
if not gemini_api_key:
    print("CRITICAL ERROR: GOOGLE_API_KEY environment variable is not set.")
    print("Please set it before running the Flask application.")

# Initialize Gemini client
genai.configure(api_key=gemini_api_key)

# ✅ Static files in same directory
app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/suggest-remedy', methods=['POST'])
def suggest_remedy():
    data = request.json
    age = data.get('age')
    gender = data.get('gender')
    symptoms = data.get('symptoms')
    severity = data.get('severity')

    try:
        prompt = (
            f"The patient is {age} years old, {gender}, with symptoms: {symptoms}. "
            f"The severity of symptoms is {severity} out of 10. "
            "Suggest a homeopathic remedy and explain why, based on the symptoms. "
            "Always include a strong disclaimer that this is for informational purposes only and not a prescription, "
            "and to consult a qualified homeopathic practitioner. "
            "Also, advise seeking immediate medical attention for severe or persistent symptoms."
        )

        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        ai_suggestion = response.text.strip()

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        ai_suggestion = f"Error from AI service: {e}. Please check your API key and network connection."

    disclaimer = (
        "Disclaimer: This is an informational suggestion and not a prescription. "
        "Always consult a qualified homeopathic practitioner for diagnosis and treatment. "
        "If symptoms are severe or persistent, seek immediate medical attention."
    )

    return jsonify({
        'suggestion': f"{ai_suggestion}\n\n{disclaimer}"
    })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

