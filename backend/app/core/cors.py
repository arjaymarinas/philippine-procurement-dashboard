from fastapi.middleware.cors import CORSMiddleware

def add_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "https://v0-phil-proc-dashboard.vercel.app/"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
