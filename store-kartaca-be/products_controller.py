from fastapi import Header, HTTPException
from pydantic import BaseModel
from constants import PRODUCTS_ENDPOINT, OFFER_ENDPOINT
from db.db import TOKEN_EMAIL_PAIRS, PRODUCTS, PRODUCTS_LAST_OFFER_OWNERS

class ProductModel(BaseModel):
    id: int
    name: str
    last_offer: float


class ProductsController:
    def __init__(self, app):
        self.app = app
        self.clients = set()

    """Not working"""
    # async def send_updated_products(self):
    #     for client in self.clients:
    #         await client.send_json(PRODUCTS)

    def register_routes(self):
        """Not working"""
        # @self.app.websocket(PRODUCTS_ENDPOINT)
        # async def get_products_websocket():
        #     async def websocket_handler(websocket):
        #         self.clients.add(websocket)
        #         try:
        #             while True:
        #                 message = await websocket.recv()
        #         except websockets.exceptions.ConnectionClosedOK:
        #             self.clients.remove(websocket)
        #     return websockets.serve(websocket_handler, "localhost", 8080)

        @self.app.get(PRODUCTS_ENDPOINT)
        async def get_products(token: str = Header(None)):

            if token is None:
                raise HTTPException(status_code=401, detail="No token provided")
            if token not in TOKEN_EMAIL_PAIRS:
                raise HTTPException(status_code=401, detail="Invalid token provided")

            return PRODUCTS

        @self.app.post(OFFER_ENDPOINT)
        async def update_product(payload: dict, token: str = Header(None)):
            if token is None:
                raise HTTPException(status_code=401, detail="No token provided")
            if token not in TOKEN_EMAIL_PAIRS.keys():
                raise HTTPException(status_code=401, detail="Invalid token provided")

            product_id = payload.get("product_id")
            offer_value = payload.get("offer_value")

            if product_id is None \
                    or offer_value is None:
                raise HTTPException(status_code=400, detail="Missing some fields")

            for product in PRODUCTS:
                if product["id"] == product_id:
                    product["last_offer"] = offer_value

                    user_id = TOKEN_EMAIL_PAIRS[token]
                    PRODUCTS_LAST_OFFER_OWNERS[user_id] = offer_value

                    # await self.send_updated_products(PRODUCTS)
                    return '', 200

            raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
