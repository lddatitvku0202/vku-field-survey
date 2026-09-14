from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import Survey
from .schemas import SurveyCreate, SurveyResponse


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="VKU Field Survey API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://vku-field-survey-eda.pages.dev",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "VKU Field Survey API is running",
    }


@app.post(
    "/api/surveys",
    response_model=SurveyResponse,
)
def create_survey(
    survey: SurveyCreate,
    db: Session = Depends(get_db),
):
    existing_survey = db.get(Survey, survey.id)

    if existing_survey:
        return existing_survey

    new_survey = Survey(
        id=survey.id,
        building=survey.building,
        floor=survey.floor,
        room=survey.room,
        category=survey.category,
        rating=survey.rating,
        notes=survey.notes,
        photo=survey.photo,
        timestamp=survey.timestamp,
    )

    db.add(new_survey)
    db.commit()
    db.refresh(new_survey)

    return new_survey


@app.get(
    "/api/surveys",
    response_model=list[SurveyResponse],
)
def get_surveys(
    db: Session = Depends(get_db),
):
    return (
        db.query(Survey)
        .order_by(Survey.timestamp.desc())
        .all()
    )


@app.get(
    "/api/surveys/{survey_id}",
    response_model=SurveyResponse,
)
def get_survey(
    survey_id: str,
    db: Session = Depends(get_db),
):
    survey = db.get(Survey, survey_id)

    if not survey:
        raise HTTPException(
            status_code=404,
            detail="Survey not found",
        )

    return survey