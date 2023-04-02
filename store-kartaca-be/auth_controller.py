from fastapi import HTTPException
from fastapi.params import Header
from fastapi.responses import JSONResponse
from model.login_model import LoginModel
from model.register_model import RegisterModel
from constants import LOGIN_ENDPOINT, REGISTER_ENDPOINT, LOGOUT_ENDPOINT
from db.db import REGISTERED_USERS, TOKEN_EMAIL_PAIRS
import uuid

class AuthController:
    def __init__(self, app):
        self.app = app

    def register_routes(self):
        @self.app.post(LOGIN_ENDPOINT)
        async def login(payload: LoginModel):
            email = payload.email
            password = payload.password
            if email in REGISTERED_USERS.keys() and password == REGISTERED_USERS[email].password:
                token = str(uuid.uuid4())
                TOKEN_EMAIL_PAIRS[token] = email

                return {"token": token}
            else:
                return JSONResponse({"message": "Invalid email or password"}, status_code=400)

        @self.app.post(REGISTER_ENDPOINT)
        async def register(payload: RegisterModel):
            if payload.email in REGISTERED_USERS.keys():
                return JSONResponse({"message": "User exists"}, status_code=400)
            REGISTERED_USERS[payload.email] = payload
            return '', 200

        @self.app.post(LOGOUT_ENDPOINT)
        async def logout(token: str = Header(None)):

            if token is None:
                raise HTTPException(status_code=401, detail="Missing access token")
            if token not in TOKEN_EMAIL_PAIRS.keys():
                raise HTTPException(status_code=401, detail="Invalid access token")

            TOKEN_EMAIL_PAIRS.pop(token)

            return '', 200