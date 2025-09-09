from dependency_injector import containers, providers
from app.core.database import init_db
from app.repositories.rule_repository import RuleRepository
from app.services.rule_service import RuleService
from app.engine.rule_engine import RuleEngine


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(modules=["app.api.rules"])

    db = providers.Singleton(init_db)

    rule_repository = providers.Factory(RuleRepository, db=db)
    rule_engine = providers.Singleton(RuleEngine)
    rule_service = providers.Factory(
        RuleService, repo=rule_repository, engine=rule_engine
    )
