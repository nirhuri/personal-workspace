from typing import Generic, TypeVar, List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase

T = TypeVar("T")


class BaseRepository(Generic[T]):
    def __init__(self, db: AsyncIOMotorDatabase, collection_name: str):
        self.collection = db[collection_name]

    async def find_all(self) -> List[dict]:
        cursor = self.collection.find({})
        return [doc async for doc in cursor]

    async def find_by_id(self, id: str) -> Optional[dict]:
        return await self.collection.find_one({"_id": id})

    async def insert(self, data: dict) -> str:
        result = await self.collection.insert_one(data)
        return str(result.inserted_id)
