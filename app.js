const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Yahan change hua hai (Line 11)
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(__dirname + '/main.html');
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'WeDo Frontend and Backend API is Ready!'
  });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});