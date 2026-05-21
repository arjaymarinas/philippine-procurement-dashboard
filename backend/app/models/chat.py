from pydantic import BaseModel

class ChatRequest(BaseModel):
    query: str
    year: str | None = None