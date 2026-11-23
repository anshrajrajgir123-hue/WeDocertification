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

app.get('/api/updates', (req, res) => {
  res.json({
    success: true,
    updates: [
      "BIS CRS new guidelines updated for electronics.",
      "WPC ETA approval process simplified.",
      "EPR Plastic & Battery compliance deadline extended."
    ]
  });
});

// POST API for Contact / Consultation Form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, service } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: "Name and Phone are required." });
  }

  console.log("New Lead Received:", { name, email, phone, service });
  res.json({ success: true, message: "Request successfully received!" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});