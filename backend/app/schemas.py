from typing import Literal, Optional

from pydantic import BaseModel, Field


SurveyCategory = Literal[
    "Hardware",
    "Projector",
    "AC",
    "Electrical",
    "Furniture",
]


class SurveyCreate(BaseModel):
    id: str

    building: str = Field(min_length=1)
    floor: int = Field(ge=1)
    room: str = Field(min_length=1)

    category: SurveyCategory

    rating: int = Field(ge=1, le=5)

    notes: str = ""

    photo: Optional[str] = None

    timestamp: int


class SurveyResponse(BaseModel):
    id: str

    building: str
    floor: int
    room: str

    category: str

    rating: int

    notes: str

    photo: Optional[str] = None

    timestamp: int

    class Config:
        from_attributes = True