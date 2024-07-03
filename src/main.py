from contextlib import asynccontextmanager
from fastapi import FastAPI
import aiohttp
from .routers import hh_router
from .database import create_tables, drop_tables


aiohttp_clientsession: aiohttp.ClientSession = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global aiohttp_clientsession
    aiohttp_clientsession = aiohttp.ClientSession()
    await create_tables()
    yield
    await aiohttp_clientsession.close()
    # await drop_tables()



app = FastAPI(title="Scraping", lifespan=lifespan)

app.include_router(hh_router, prefix="/api")




