const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const { exec } = require('child_process');
const util = require('util');

// Promisify exec to use async/await
const execAsync = util.promisify(exec);

const configureRoutes = require('./routes');
const KintoneService = require('./services/kintoneService');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Serve static files (e.g., React frontend)
app.use(express.static(path.resolve(__dirname, "../../portfolio-client/dist")));

// Configure application routes
configureRoutes(app);

app.get('test', (req, res)=>{
    res.status(200).json({message: 12345});
});

// Kintone cron job example
cron.schedule('0 4 * * *', async () => {
  console.log('Syncing with Kintone...');
  try {
    await KintoneService.syncData();
    console.log('Successfully synced with Kintone.');
  } catch (error) {
    console.error(`Error syncing with Kintone: ${error.message}`);
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.status(200).json({ message: "anime coming 2" });
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../portfolio-client/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
