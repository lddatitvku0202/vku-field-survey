from sqlalchemy import BigInteger, Column, Integer, String, Text

from .database import Base


class Survey(Base):
    __tablename__ = "surveys"

    id = Column(String, primary_key=True, index=True)

    building = Column(String, nullable=False)
    floor = Column(Integer, nullable=False)
    room = Column(String, nullable=False)

    category = Column(String, nullable=False)

    rating = Column(Integer, nullable=False)

    notes = Column(Text, nullable=False, default="")

    photo = Column(Text, nullable=True)

    timestamp = Column(BigInteger, nullable=False)