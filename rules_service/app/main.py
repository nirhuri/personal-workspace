import asyncio
from app.kafka.rule_producer import RuleProducer
from app.kafka.rule_consumer import RuleConsumer
from app.services.rule_service import RuleService
from app.repositories.rule_repository import RuleRepository
from app.engine.rule_engine import RuleEngine
from app.core.database import init_db


async def main():
    db = await init_db()
    repo = RuleRepository(db)
    engine = RuleEngine()
    producer = RuleProducer(bootstrap_servers="localhost:9092")
    await producer.start()

    rule_service = RuleService(repo, engine, producer)
    consumer = RuleConsumer(
        bootstrap_servers="localhost:9092", rule_service=rule_service
    )

    await consumer.start()


if __name__ == "__main__":
    asyncio.run(main())
