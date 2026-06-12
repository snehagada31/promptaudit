const BASE_URL = "http://localhost:8000"

export async function reviewCode(code, language = "auto") {
  const response = await fetch(`${BASE_URL}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.detail || "Review failed")
  }
  return response.json()
}
