# app/models/user_rule.py
from sqlalchemy import Column, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.models.rule_definition import Base, RuleDefinition


class UserRule(Base):
    __tablename__ = "user_rules"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)  # שיוך למשתמש
    rule_id = Column(Integer, ForeignKey("rules.id"), nullable=False)
    params = Column(JSON, nullable=False, default={})

    rule = relationship(RuleDefinition)
