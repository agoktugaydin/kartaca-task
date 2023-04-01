import websocket
import json


def on_message(ws, message):
    # process the incoming message
    data = json.loads(message)
    print(data)


# create a WebSocket connection to the URL
ws = websocket.WebSocketApp("wss://cekirdektenyetisenler.kartaca.com/ws")

# set the message handler
ws.on_message = on_message

# start the WebSocket connection
ws.run_forever()
