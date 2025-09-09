from typing import Dict, Type


class RuleHandlerRegistry:
    _registry: Dict[str, "RuleHandler"] = {}

    @classmethod
    def register(cls, type_name: str, handler_cls: Type["RuleHandler"]):
        cls._registry[type_name] = handler_cls

    @classmethod
    def get_handler(cls, type_name: str) -> "RuleHandler":
        handler_cls = cls._registry.get(type_name)
        if not handler_cls:
            raise ValueError(f"No handler registered for type {type_name}")
        return handler_cls()


class RuleHandler:
    def validate(self, data: dict, params: dict) -> bool:
        raise NotImplementedError


# ---- Example Handlers ----
class MaxLengthRule(RuleHandler):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        RuleHandlerRegistry.register("max_length", cls)

    def validate(self, data: dict, params: dict) -> bool:
        return len(data.get("content", "")) <= params.get("max_length", 5000)


class ForbiddenWordRule(RuleHandler):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        RuleHandlerRegistry.register("forbidden_word", cls)

    def validate(self, data: dict, params: dict) -> bool:
        forbidden = params.get("word", "")
        return forbidden not in data.get("content", "")
