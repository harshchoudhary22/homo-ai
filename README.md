An AI-powered web application that suggests homeopathic remedies based on user-provided symptoms using Google Gemini (gemini-2.5-flash) and a Flask backend.

🚀 Features

Takes user input (age, gender, symptoms, severity) Calls Gemini API for remedy suggestions Displays AI response with a medical disclaimer Frontend built with HTML/CSS/JS Backend with Flask + CORS

🛠️ Tech Stack

Python (Flask, Gunicorn) Google Gemini API HTML, CSS, JavaScript Hosted on Render (backend) + GitHub Pages (frontend) 🧑‍💻 How to Run Locally

Go to backend folder
cd backend

Install dependencies
pip install -r requirements.txt

Set your API key (Windows PowerShell)
$env:GOOGLE_API_KEY="YOUR_KEY_HERE"

Run Flask
python app.py
