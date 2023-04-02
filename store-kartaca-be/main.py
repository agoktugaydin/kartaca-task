from fastapi import FastAPI
from auth_controller import AuthController
from products_controller import ProductsController
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


auth_controller = AuthController(app)
auth_controller.register_routes()

products_controller = ProductsController(app)
products_controller.register_routes()

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)
