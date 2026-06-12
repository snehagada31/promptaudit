# PromptAudit — AI Code Review SaaS

An AI-powered code review tool built for developers. Paste any code snippet and instantly get:
- 🐛 **Bug detection** — common issues and mistakes in your code
- 💡 **Suggestions** — ways to improve readability and performance
- 📊 **Complexity rating** — Low / Medium / High
- ✨ **Refactored version** — a cleaner rewrite of your code

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python FastAPI |
| AI | Groq API (LLaMA 3.3 70B) |

## Features
- Supports any programming language (auto-detected)
- Side-by-side code input and review results
- Real-time AI analysis via REST API
- Clean dark UI built with Tailwind CSS

## Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Architecture
```
React Frontend  →  FastAPI Backend  →  Groq AI (LLaMA 3.3)
(localhost:5173)    (localhost:8000)
```
The frontend sends code to the FastAPI backend via a POST request. The backend forwards it to the Groq AI API with a structured prompt that forces JSON output. The response is parsed and returned to the frontend as structured data.

## Project Structure
```
promptaudit/
├── backend/
│   ├── main.py          # FastAPI server + AI integration
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx              # Main UI component
    │   ├── api.js               # API calls to backend
    │   └── components/
    │       ├── ResultPanel.jsx      # Displays review results
    │       └── ComplexityBadge.jsx  # Complexity indicator
    └── package.json
```
