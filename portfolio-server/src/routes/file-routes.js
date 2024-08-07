// src/routes/fileRoutes.js
const express = require('express');
const { uploadFile, getFile } = require('../utils/storageService');
const generateUniqueFilename = require('../utils/uniqueFilename');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const fs = require('fs');

// Endpoint to upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const fileBuffer = file.buffer; // Access the buffer directly
        const uniqueFilename = generateUniqueFilename(file.originalname);
        let uploadedFile = await uploadFile(fileBuffer, "gg/" + uniqueFilename);
        res.status(200).send(uploadedFile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error uploading file');
    }
});

// Endpoint to download a file
router.get('/download/:objectName', async (req, res) => {
    const { objectName } = req.params;
    const downloadPath = path.join(__dirname, 'downloads', objectName);

    try {
        await getFile(objectName, downloadPath);
        res.status(200).sendFile(downloadPath);
    } catch (error) {
        res.status(500).send('Error downloading file');
    }
});

module.exports = router;
