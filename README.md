# Kartaca Store
Project made for the Kartaca.

My registrationKey:
'953a7f09c7a9e39c076a71f0d1883d4d9dc576162428fe81572c695d6a745169'

- Registration, logging in, logging out, bidding can be done in the application.
- The steps and resources made while developing the application are specified in the notes-and-references.txt files for both the frontend and the backend.

The following pages are available:
- /home
- /login
- /register

## Frontend
ReactJS

To run it, the following command is used in the home directory:
- npm start

## Backend
FastAPI

To run it, the following command is used in the home directory:
- uvicorn main:app --reload --8080

### Missing

- Transmitting product information to all users with each update using websocket
- Using Redis for session information
- Making it work with docker-compose up by dockerizing it