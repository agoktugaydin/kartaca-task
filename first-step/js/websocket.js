const socket = new WebSocket('wss://cekirdektenyetisenler.kartaca.com/ws');

socket.addEventListener('message', event => {
  // process the incoming message
  const data = JSON.parse(event.data);
  console.log(data);
});

socket.addEventListener('open', event => {
  console.log('WebSocket connection established');
});

socket.addEventListener('close', event => {
  console.log('WebSocket connection closed');
});

socket.addEventListener('error', event => {
  console.error('WebSocket error:', event);
});
