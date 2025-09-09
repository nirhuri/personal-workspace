from pydantic import BaseModel
from typing import Any, Dict


class Rule(BaseModel):
    name: str
    condition: Dict[str, Any]
    action: Dict[str, Any]
