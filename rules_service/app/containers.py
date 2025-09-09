from dependency_injector import containers, providers
from app.db.mongo import MongoConnection
from app.services.rule_engine import RuleEngine
import os
from dotenv import load_dotenv

load_dotenv()


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    config.mongo_uri.from_env("MONGO_URI")
    config.mongo_db.from_env("MONGO_DB")

    mongo_connection = providers.Singleton(
        MongoConnection, uri=config.mongo_uri, db_name=config.mongo_db
    )

    rule_engine = providers.Singleton(RuleEngine)
