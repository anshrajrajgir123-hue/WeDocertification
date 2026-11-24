require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

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
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);
// POST API for Contact / Consultation Form

  // POST API for Contact / Consultation Form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, service } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone are required." });
    }
    const newContact = new Contact({ name, email, phone, service });
    await newContact.save();
    return res.status(201).json({ success: true, message: "Enquiry saved successfully!" });
  } catch (error) {
    console.error("Contact save error:", error);
    return res.status(500).json({ success: false, message: "Server error while saving contact." });
  }
});
  
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});