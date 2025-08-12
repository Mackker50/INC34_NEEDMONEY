const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins (you can restrict later if needed)
app.use(cors());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

// POST endpoint for file uploads
app.post('/api/upload-slip', upload.single('slip'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    console.log('Uploaded file:', req.file);

    const fileUrl = `https://inc34needmoney-production.up.railway.app/uploads/${req.file.filename}`;
    res.json({ message: 'File uploaded successfully!', fileUrl });
});
// GET endpoint to check server status

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
