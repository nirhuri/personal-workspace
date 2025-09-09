from fastapi import FastAPI
from app.api.routes import router
from app.containers import Container
from dependency_injector.wiring import inject, Provide

container = Container()
container.wire(modules=[__name__, "app.api.routes"])

app = FastAPI(title="Rules Service")

app.include_router(router, prefix="/api")


@app.on_event("startup")
def startup_event():
    print("Rules Service starting up...")
