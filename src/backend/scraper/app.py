import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
import aiohttp
from .routers import hh_router, user_router
from .config.database import create_tables, drop_tables
from fastapi.middleware.cors import CORSMiddleware



aiohttp_clientsession: aiohttp.ClientSession = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global aiohttp_clientsession
    aiohttp_clientsession = aiohttp.ClientSession()
    await create_tables()
    yield
    await aiohttp_clientsession.close()
    # await drop_tables()



app = FastAPI(title="Scraping", lifespan=lifespan, root_path="/api/scraper")

origins = ["*"]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=['null'],
    allow_credentials=True, 
    allow_methods=['*'], 
    allow_headers=['*'])


app.include_router(hh_router)
app.include_router(user_router)


if __name__ == "__main__":
    uvicorn.run(app='app:app', host="0.0.0.0", port=8000, reload=True, debug=True)




