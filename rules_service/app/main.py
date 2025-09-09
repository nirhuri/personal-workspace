from fastapi import FastAPI
from app.api import rules
from app.containers import Container

app = FastAPI()
container = Container()
app.container = container

app.include_router(rules.router, prefix="/rules")
