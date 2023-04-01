import websockets
import asyncio
import json

# referans: https://stackoverflow.com/a/72629896
async def write(websocket, message):
    await websocket.send(message)


async def read(websocket):
    while True:
        message = await websocket.recv()
        print(message)

async def main():
    url = "wss://cekirdektenyetisenler.kartaca.com/ws"
    register_message = {"type": "REGISTER", "name": "Ahmed Goktug", "surname": "Aydin",
                        "email": "agoktugaydin@gmail.com", "registrationKey": "85877b8cdaa78e56705287bb61bf8cc222b25715631b97108876ada3b061f102"}
    json_register_message = json.dumps(register_message)
    async with websockets.connect(url) as ws:
        await write(ws, json_register_message)
        await read(ws)
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
