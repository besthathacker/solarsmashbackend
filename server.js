// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });
console.log("WebRTC signaling server running...");

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  console.log("Client connected. Total:", clients.length);

  ws.on('message', (message) => {
    // Broadcast message to all other clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
    console.log("Client disconnected. Total:", clients.length);
  });
});
