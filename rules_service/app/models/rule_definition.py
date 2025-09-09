# app/models/rule_definition.py
from pydantic import BaseModel, Field
from typing import Dict, Any
from enum import Enum


class RuleType(str, Enum):
    MAX_LENGTH = "max_length"
    FORBIDDEN_WORD = "forbidden_word"
    NOTE_TYPE_LIMIT = "note_type_limit"
    DUE_DATE_REQUIRED = "due_date_required"


class RuleDefinition(BaseModel):
    id: str | None = Field(default=None, alias="_id")
    name: str
    description: str
    type: RuleType
    params: Dict[str, Any]

    class Config:
        allow_population_by_field_name = True
        use_enum_values = True
