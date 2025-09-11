import json
from aiokafka import AIOKafkaConsumer
from app.services.rule_service import RuleService


class RuleConsumer:
    def __init__(self, bootstrap_servers: str, rule_service: RuleService):
        self._consumer = AIOKafkaConsumer(
            "note.created",
            "note.updated",
            bootstrap_servers=bootstrap_servers,
            group_id="rule_service_group",
        )
        self.rule_service = rule_service

    async def start(self):
        await self._consumer.start()
        try:
            async for msg in self._consumer:
                await self.handle_event(msg)
        finally:
            await self._consumer.stop()

    async def handle_event(self, msg):
        event = json.loads(msg.value)
        note = event["note"]
        user_id = event["user_id"]

        await self.rule_service.validate_note_for_user(note, user_id)
