from fastapi import APIRouter, Depends
from app.models.rule import Rule
from app.services.rule_engine import RuleEngine
from dependency_injector.wiring import inject, Provide
from app.containers import Container

router = APIRouter()


@router.post("/rules")
@inject
def add_rule(rule: Rule, engine: RuleEngine = Depends(Provide[Container.rule_engine])):
    engine.add_rule(rule)
    return {"message": "Rule added successfully", "rule": rule}


@router.get("/rules")
@inject
def get_rules(engine: RuleEngine = Depends(Provide[Container.rule_engine])):
    return {"rules": engine.rules}
