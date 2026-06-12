from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import re
import json

app = FastAPI(title="PromptAudit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⬇️ PASTE YOUR GROQ API KEY HERE (free at console.groq.com)
GROQ_API_KEY = "PASTE_YOUR_GROQ_KEY_HERE"

client = Groq(api_key=GROQ_API_KEY)


class ReviewRequest(BaseModel):
    code: str
    language: str = "auto"


class ReviewResponse(BaseModel):
    summary: str
    bugs: list[str]
    suggestions: list[str]
    complexity: str
    refactored: str


SYSTEM_PROMPT = """You are a senior software engineer doing a code review.
Respond ONLY in this exact JSON format, no markdown fences, no extra text:
{
  "summary": "One sentence describing what this code does.",
  "bugs": ["bug 1", "bug 2"],
  "suggestions": ["suggestion 1", "suggestion 2"],
  "complexity": "Low",
  "refactored": "// improved version of the code here"
}
complexity must be exactly one of: Low, Medium, High.
bugs and suggestions should each have 2-4 items."""


@app.post("/review", response_model=ReviewResponse)
async def review_code(req: ReviewRequest):
    if not req.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty.")
    if len(req.code) > 8000:
        raise HTTPException(status_code=400, detail="Code too long (max 8000 chars).")

    try:
        chat = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Language: {req.language}\n\nCode:\n{req.code}"}
            ],
            temperature=0.3,
        )
        raw = chat.choices[0].message.content.strip()
        raw = re.sub(r"^```[a-z]*\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw)
        parsed = json.loads(raw)
        return ReviewResponse(**parsed)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI review failed: {str(e)}")


@app.get("/health")
def health():
    return {"status": "ok"}
