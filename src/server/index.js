const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only images and PDF files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Routes
app.post('/api/join', upload.single('idCard'), (req, res) => {
  try {
    const { firstName, lastName, email, phone, birthDate, city, profession, consent } = req.body;
    
    // In a real app, you would save this to a database
    console.log('Membership application received:', {
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      city,
      profession,
      idCardFile: req.file ? req.file.filename : null,
      consent: consent === 'true'
    });
    
    // For demo purposes, save to a JSON file
    const membersFile = path.join(__dirname, 'data', 'members.json');
    const membersDir = path.dirname(membersFile);
    
    if (!fs.existsSync(membersDir)) {
      fs.mkdirSync(membersDir, { recursive: true });
    }
    
    let members = [];
    if (fs.existsSync(membersFile)) {
      const data = fs.readFileSync(membersFile, 'utf8');
      members = JSON.parse(data);
    }
    
    members.push({
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      city,
      profession,
      idCardFile: req.file ? req.file.filename : null,
      consent: consent === 'true',
      submittedAt: new Date().toISOString()
    });
    
    fs.writeFileSync(membersFile, JSON.stringify(members, null, 2));
    
    res.status(201).json({ success: true, message: 'Membership application submitted successfully!' });
  } catch (error) {
    console.error('Error processing membership application:', error);
    res.status(500).json({ success: false, message: 'Error processing your application. Please try again.' });
  }
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // In a real app, you would save this to a database and/or send an email
    console.log('Contact message received:', { name, email, subject, message });
    
    // For demo purposes, save to a JSON file
    const messagesFile = path.join(__dirname, 'data', 'messages.json');
    const messagesDir = path.dirname(messagesFile);
    
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }
    
    let messages = [];
    if (fs.existsSync(messagesFile)) {
      const data = fs.readFileSync(messagesFile, 'utf8');
      messages = JSON.parse(data);
    }
    
    messages.push({
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString()
    });
    
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact message:', error);
    res.status(500).json({ success: false, message: 'Error sending your message. Please try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 