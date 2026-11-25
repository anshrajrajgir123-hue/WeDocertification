require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://wedocertifications_db_user:fZ071uL8XcJej3cK@wedocertification.vkojimi.mongodb.net/wedo?retryWrites=true&w=majority")
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST API for Contact / Consultation Form
app.post("/api/contact", async (req, res) => {
  try {
    const body = req.body || {};
    const name = body.name || body.fullName || body.full_name || "";
    const email = body.email || "";
    const phone = body.phone || body.modal_phone || body.mobile || body.phone_number || "";
    const service = body.service || body.subject || "";

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and Phone are required. Received: " + JSON.stringify(body)
      });
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

/* === SMOOTH SERVICES DROPDOWN & DISABLE NIGHT MODE === */
document.addEventListener('DOMContentLoaded', function () {
  // Force remove any saved dark mode preference
  try {
    localStorage.removeItem('theme');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('nightMode');
    document.documentElement.classList.remove('dark', 'dark-mode', 'night-mode');
    document.body.classList.remove('dark', 'dark-mode', 'night-mode');
  } catch (e) {}

  // Find Services nav trigger and keep dropdown open on click/hover without page jump
  const navLinks = document.querySelectorAll('nav a, header a, .nav-link');
  navLinks.forEach(function (link) {
    const label = (link.textContent || '').trim().toLowerCase();
    if (label.startsWith('services')) {
      const parent = link.closest('li, .nav-item, .dropdown, .has-dropdown') || link.parentElement;
      const menu = parent ? parent.querySelector('.mega-menu, .dropdown-menu, .services-dropdown, div') : null;

      if (menu) {
        let closeTimer = null;

        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const alreadyOpen = parent.classList.contains('is-open');
          document.querySelectorAll('.is-open').forEach(el => el.classList.remove('is-open'));
          if (!alreadyOpen) {
            parent.classList.add('is-open');
            menu.classList.add('is-open');
          }
        });

        parent.addEventListener('mouseenter', function () {
          clearTimeout(closeTimer);
          parent.classList.add('is-open');
          menu.classList.add('is-open');
        });

        parent.addEventListener('mouseleave', function () {
          closeTimer = setTimeout(function () {
            parent.classList.remove('is-open');
            menu.classList.remove('is-open');
          }, 260);
        });
      }
    }
  });

  // Close dropdown only when clicking completely outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.is-open')) {
      document.querySelectorAll('.is-open').forEach(el => el.classList.remove('is-open'));
    }
  });
});
