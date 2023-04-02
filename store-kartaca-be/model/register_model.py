from pydantic import BaseModel

class RegisterModel(BaseModel):
    name: str
    surname: str
    email: str
    password: str