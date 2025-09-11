import json
from aiokafka import AIOKafkaProducer


class RuleProducer:
    def __init__(self, bootstrap_servers: str):
        self._producer = AIOKafkaProducer(bootstrap_servers=bootstrap_servers)

    async def start(self):
        await self._producer.start()

    async def stop(self):
        await self._producer.stop()

    async def send_validation_failed(
        self, note_id: int, user_id: int, errors: list[str]
    ):
        message = {
            "note_id": note_id,
            "user_id": user_id,
            "errors": errors,
        }
        await self._producer.send_and_wait(
            "note.validation_failed", json.dumps(message).encode("utf-8")
        )
