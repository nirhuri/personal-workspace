from typing import Dict, Type


class RuleHandlerRegistry:
    _registry: Dict[str, Type["RuleHandler"]] = {}

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
    type_name: str = None

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if cls.type_name:
            RuleHandlerRegistry.register(cls.type_name, cls)

    def validate(self, data: dict, params: dict) -> bool:
        raise NotImplementedError


# ---- Example Handlers ----
class MaxLengthRule(RuleHandler):
    type_name = "max_length"

    def validate(self, data: dict, params: dict) -> bool:
        return len(data.get("content", "")) <= params.get("max_length", 5000)


class RequiredFieldRule(RuleHandler):
    type_name = "required_field"

    def validate(self, data: dict, params: dict) -> bool:
        return params["field"] in data
