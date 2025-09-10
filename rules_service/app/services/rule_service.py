from app.repositories.rule_repository import RuleRepository
from app.engine.rule_engine import RuleEngine


class RuleService:
    def __init__(self, repo: RuleRepository, engine: RuleEngine):
        self.repo = repo
        self.engine = engine

    async def load_rules_for_user(self, user_id: int):
        rules = await self.repo.get_rules_by_user(user_id)
        self.engine.load_rules(rules)

    def validate(self, data: dict) -> list[str]:
        return self.engine.validate(data)
