# app/containers.py
from dependency_injector import containers, providers
from app.core.database import init_db
from app.repositories.rule_repository import RuleRepository
from app.engine.rule_engine import RuleEngine
from app.services.rule_service import RuleService


class Container(containers.DeclarativeContainer):
    """Dependency Injection container for the application."""

    wiring_config = containers.WiringConfiguration(modules=["app.api.rules"])

    # --- Core infrastructure ---
    db = providers.Singleton(init_db)

    # --- Repositories ---
    rule_repository = providers.Factory(
        RuleRepository,
        db=db,
    )

    # --- Engines ---
    rule_engine = providers.Singleton(RuleEngine)

    # --- Services ---
    rule_service = providers.Factory(
        RuleService,
        repo=rule_repository,
        engine=rule_engine,
    )
