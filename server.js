const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer storage to save files in 'uploads' folder with original filename
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'uploads/');
},
filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // prefix to avoid name conflicts
},
});
const upload = multer({ storage: storage });

// POST endpoint to receive uploaded slip
app.post('/api/upload-slip', upload.single('slip'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    console.log('Uploaded file:', req.file);

    // Return URL to access uploaded file
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ message: 'File uploaded successfully!', fileUrl });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
