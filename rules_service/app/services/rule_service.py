from app.repositories.rule_repository import RuleRepository
from app.engine.rule_engine import RuleEngine
from app.kafka.rule_producer import RuleProducer


class RuleService:
    def __init__(
        self, repo: RuleRepository, engine: RuleEngine, producer: RuleProducer
    ):
        self.repo = repo
        self.engine = engine
        self.producer = producer

    async def validate_note_for_user(self, note: dict, user_id: int):
        user_rules = await self.repo.get_rules_by_user(user_id)
        self.engine.load_rules(user_rules)

        errors = self.engine.validate(note)

        if errors:
            await self.producer.send_validation_failed(
                note_id=note["id"], user_id=user_id, errors=errors
            )

        return errors
