from fastapi import FastAPI
from app.core.cors import add_cors
from app.api.dashboard import router as dashboard_router
from app.api.ai_summary import router as ai_summary_router
from app.api.chat import router as chat_router

app = FastAPI(title="Procurement Insights API")

# enable CORS
add_cors(app)

# register routes
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])

app.include_router(ai_summary_router, prefix="/ai-summary")

app.include_router(chat_router, prefix="/chat")
