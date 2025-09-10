# app/models/rule_definition.py
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class RuleDefinition(Base):
    __tablename__ = "rules"

    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String, nullable=False)  # למשל "max_length"
    name = Column(String, nullable=False)  # שם קריא
    description = Column(Text, nullable=True)
