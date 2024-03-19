const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a folder if it doesn't exist
const folderPath = path.join(__dirname, 'files');
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

app.post('/createFile', (req, res) => {
    const timestamp = new Date().toISOString().replace(/[.:]/g, '-');
    const filename = `${timestamp}.txt`;
    const filePath = path.join(folderPath, filename);
    const fileContent = timestamp;

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return res.status(500).json({ error: 'Could not create file' });
        }
        res.json({ message: 'File created successfully', filename });
    });
});

app.get('/getTextFiles', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Could not read directory' });
        }
        res.json({ files });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
