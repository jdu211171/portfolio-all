// src/utils/storageService.js
const AWS = require('aws-sdk');
const https = require('https');

// Configure the AWS SDK to connect to MinIO
AWS.NodeHttpClient.sslAgent = new https.Agent({ rejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0' });

const s3Client = new AWS.S3({
    endpoint: new AWS.Endpoint(`${process.env.AWS_S3_ENDPOINT}:${process.env.AWS_S3_PORT}`),
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    s3ForcePathStyle: true, // needed with MinIO
    signatureVersion: 'v4',
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

// Function to upload a file
const uploadFile = async (fileBuffer, objectName) => {
    try {
        const uploadParams = {
            Bucket: bucketName,
            Key: objectName,
            Body: fileBuffer,
        };

        const data = await s3Client.upload(uploadParams).promise();
        return data
    } catch (error) {
        console.log('Error uploading file:', error);
        throw error;
    }
};

// Function to delete a file using the file's URL
const deleteFile = async (fileUrl) => {
    try {
        // Extract the object key from the file URL
        const url = new URL(fileUrl);
        let objectName = decodeURIComponent(url.pathname.substring(1)); // Remove the leading '/' and decode any encoded characters

        // Remove the "portfolio/" prefix if it exists
        const prefix = 'portfolio/';
        if (objectName.startsWith(prefix)) {
            objectName = objectName.substring(prefix.length);
        }

        const deleteParams = {
            Bucket: bucketName,
            Key: objectName,
        };

        await s3Client.deleteObject(deleteParams).promise();
        console.log(`File ${objectName} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

// Function to download a file
const getFile = async (objectName, downloadPath) => {
    try {
        const downloadParams = {
            Bucket: bucketName,
            Key: objectName,
        };

        const data = await s3Client.getObject(downloadParams).promise();
        fs.writeFileSync(downloadPath, data.Body);
        console.log(`File ${objectName} downloaded to ${downloadPath}`);
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
};

module.exports = {
    uploadFile,
    deleteFile,
    getFile,
};
