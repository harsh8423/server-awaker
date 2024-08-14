const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;


const cors = require("cors");
// Set up CORS middleware
const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:3000",
  "http://192.168.0.167:8081",
  'http://127.0.0.1:3000',
  'https://encoder-backend.onrender.com'
  // Add more origins as needed
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Endpoint to receive a message from server2
app.post('/receive-message', (req, res) => {
    console.log('Received message from server2:', req.body);
    res.sendStatus(200);
});

// Function to send a message to server2 every 10 minutes
const sendMessageToServer2 = () => {
    axios.post('https://encoder-backend.onrender.com/receive-message', {
        message: 'Hello from server1',
        timestamp: new Date().toISOString(),
    })
    .then(() => console.log('Message sent to server2'))
    .catch((error) => console.error('Error sending message:', error));
};

// Start sending messages at intervals of 10 minutes
setInterval(sendMessageToServer2, 10 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server1 listening on port ${PORT}`);
    sendMessageToServer2(); // Initial message
});

