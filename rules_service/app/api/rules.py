from fastapi import APIRouter, Depends
from dependency_injector.wiring import inject, Provide
from app.containers import Container
from app.repositories.rule_repository import RuleRepository
from app.models.user_rule import UserRule

router = APIRouter()


@router.post("/rules/{user_id}")
@inject
async def create_rule(
    user_id: int,
    rule: dict,  # {"type": "max_length", "params": {"max_length": 4000}}
    repo: RuleRepository = Depends(Provide[Container.rule_repository]),
):
    new_rule = UserRule(user_id=user_id, rule_type=rule["type"], params=rule["params"])
    await repo.add_rule(new_rule)
    return {"message": "Rule created", "rule": rule}


@router.get("/rules/{user_id}")
@inject
async def list_rules(
    user_id: int,
    repo: RuleRepository = Depends(Provide[Container.rule_repository]),
):
    rules = await repo.get_rules_by_user(user_id)
    return rules
