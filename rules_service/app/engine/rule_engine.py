from app.engine.rule_handler import RuleHandlerRegistry
from app.models.rule_definition import RuleDefinition


class RuleEngine:
    def __init__(self):
        self.rules: list[RuleDefinition] = []

    def load_rules(self, rules: list[RuleDefinition]):
        self.rules = rules

    def validate(self, data: dict) -> list[str]:
        errors = []
        for rule in self.rules:
            try:
                handler = RuleHandlerRegistry.get_handler(rule.type)
                if not handler.validate(data, rule.params):
                    errors.append(f"Rule {rule.name} failed: {rule.description}")
            except ValueError as e:
                errors.append(str(e))
        return errors
