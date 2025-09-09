from app.core.base_repository import BaseRepository
from app.models.rule_definition import RuleDefinition


class RuleRepository(BaseRepository[RuleDefinition]):
    def __init__(self, db):
        super().__init__(db, "rules")

    async def get_all_rules(self) -> list[RuleDefinition]:
        docs = await self.find_all()
        return [RuleDefinition(**doc) for doc in docs]
