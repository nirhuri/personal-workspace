from typing import List
from app.models.rule import Rule


class RuleEngine:
    def __init__(self):
        self.rules: List[Rule] = []

    def add_rule(self, rule: Rule):
        self.rules.append(rule)

    def evaluate(self, task: dict) -> List[dict]:
        results = []
        for rule in self.rules:
            if self._match_condition(rule.condition, task):
                results.append(rule.action)
        return results

    def _match_condition(self, condition: dict, task: dict) -> bool:
        for key, value in condition.items():
            if task.get(key) != value:
                return False
        return True
