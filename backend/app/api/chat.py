from fastapi import APIRouter
from app.models.chat import ChatRequest
from app.services.chat_service import answer_procurement_question

router = APIRouter()

@router.post("")
def chat(request: ChatRequest):

    response = answer_procurement_question(request.query, request.year)

    return {
        "answer": response
    }