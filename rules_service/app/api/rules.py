from fastapi import APIRouter, Depends
from app.services.rule_service import RuleService
from app.containers import Container

router = APIRouter()


@router.post("/validate")
async def validate_rule(
    data: dict, service: RuleService = Depends(Container.rule_service)
):
    errors = service.validate(data)
    return {"valid": not errors, "errors": errors}
