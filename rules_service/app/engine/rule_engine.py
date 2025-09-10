from app.engine.rule_handler import RuleHandlerRegistry
from app.models.user_rule import UserRule


class RuleEngine:
    def __init__(self):
        self.rules: list[UserRule] = []

    def load_rules(self, rules: list[UserRule]):
        self.rules = rules

    def validate(self, data: dict) -> list[str]:
        errors = []
        for user_rule in self.rules:
            rule_def = user_rule.rule  # RuleDefinition
            params = user_rule.params or {}
            try:
                handler = RuleHandlerRegistry.get_handler(rule_def.type)
                if not handler.validate(data, params):
                    errors.append(
                        f"Rule {rule_def.name} failed: {rule_def.description}"
                    )
            except ValueError as e:
                errors.append(str(e))
        return errors
