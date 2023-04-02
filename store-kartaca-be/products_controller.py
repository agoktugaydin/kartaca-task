from fastapi import Header, HTTPException
from pydantic import BaseModel
from constants import PRODUCTS_ENDPOINT
from db.db import TOKEN_EMAIL_PAIRS, PRODUCTS

class ProductModel(BaseModel):
    id: int
    name: str
    price: float


class ProductsController:
    def __init__(self, app):
        self.app = app

    def register_routes(self):
        @self.app.get(PRODUCTS_ENDPOINT)
        async def get_products(token: str = Header(None)):

            if token is None:
                raise HTTPException(status_code=401, detail="No token")
            if token not in TOKEN_EMAIL_PAIRS:
                raise HTTPException(status_code=401, detail="Invalid token")

            return PRODUCTS