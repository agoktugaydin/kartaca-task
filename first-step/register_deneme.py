import websockets
import asyncio
import json
from decrypt import Decryptor

# referans: https://stackoverflow.com/a/72629896


async def write(websocket, message):
    await websocket.send(message)


async def read_once(websocket):
    message = await websocket.recv()
    return message


async def read(websocket):
    while True:
        message = await websocket.recv()
        print(message)


def extract_registrationKey(text):
    key = text.split("registrationKey : ")[1]
    return key


async def main():
    decryptor = Decryptor()

    url = "wss://cekirdektenyetisenler.kartaca.com/ws"

    register_message = {"type": "REGISTER", "name": "Ahmed Goktug", "surname": "Aydin",
                        "email": "agoktugaydin@gmail.com", "registrationKey": "xxxx"}

    async with websockets.connect(url) as ws:
        first_response = await read_once(ws)

        decrypted_first_response = decryptor.decrypt_message(first_response)
        key_raw = extract_registrationKey(
            decrypted_first_response)  # ex: 00000}"
        key = key_raw[:-2]  # ex: 00000

        print("KEY RAW -> ", key_raw, "KEY ->", key)
        register_message["registrationKey"] = key
        print("register_message ->", register_message)
        json_register_message = json.dumps(register_message)

        await write(ws, json_register_message)
        await read(ws)
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
