const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 8080;

// Create an HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Function to generate random stock data
const generateStockData = () => {
  const stocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
  return stocks.map((stock) => ({
    symbol: stock,
    price: (Math.random() * 1000 + 500).toFixed(2),
    time: new Date().toLocaleTimeString(),
  }));
};

// Broadcast data to all connected clients
const broadcastStockData = () => {
  const data = generateStockData();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Send stock data every second
setInterval(broadcastStockData, 1000);

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
