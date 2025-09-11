from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user_rule import UserRule


class RuleRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_rules_by_user(self, user_id: int) -> list[UserRule]:
        result = await self.session.execute(
            select(UserRule).where(UserRule.user_id == user_id).options()
        )
        return result.scalars().all()
